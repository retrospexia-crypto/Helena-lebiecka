import { useCallback, useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase";

const COLLECTION = "gallery";

const DEFAULT_GALLERY = [
  {
    id: "p1",
    ref: "001",
    title: "Dodaj tytuł obrazu",
    description: "To miejsce na opis pracy — technika, format, historia powstania.",
    image: "",
    storageKey: "",
  },
  {
    id: "p2",
    ref: "002",
    title: "Dodaj tytuł obrazu",
    description: "To miejsce na opis pracy — technika, format, historia powstania.",
    image: "",
    storageKey: "",
  },
  {
    id: "p3",
    ref: "003",
    title: "Dodaj tytuł obrazu",
    description: "To miejsce na opis pracy — technika, format, historia powstania.",
    image: "",
    storageKey: "",
  },
];

/**
 * Upload a base64 data-URL to Firebase Storage and return the public download URL.
 * Returns null if dataUrl is empty.
 */
async function uploadImageToStorage(itemId, dataUrl) {
  if (!dataUrl) return { url: "", storageKey: "" };
  const key = `gallery/${itemId}_${Date.now()}.jpg`;
  const sRef = storageRef(storage, key);
  await uploadString(sRef, dataUrl, "data_url");
  const url = await getDownloadURL(sRef);
  return { url, storageKey: key };
}

/**
 * Delete an image from Firebase Storage by its storage key.
 * Silently ignores errors (e.g. already deleted).
 */
async function deleteImageFromStorage(storageKey) {
  if (!storageKey) return;
  try {
    await deleteObject(storageRef(storage, storageKey));
  } catch {
    // ignore
  }
}

/**
 * Gallery state persisted in Firestore.
 * Images are stored in Firebase Storage; Firestore documents hold metadata
 * (ref, title, description) plus the public download URL and the storage key.
 *
 * The hook mirrors the previous localStorage API:
 *   { gallery, persist, scheduleSave, saveError }
 */
export function useGallery() {
  const [gallery, setGallery] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const saveTimer = useRef(null);

  // ── Real-time listener ──────────────────────────────────────────────────
  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy("ref", "asc"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty && !initialized) {
          // First run: seed default items
          DEFAULT_GALLERY.forEach((item) => {
            setDoc(doc(db, COLLECTION, item.id), item).catch(console.error);
          });
        } else {
          const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setGallery(items);
        }
        setInitialized(true);
      },
      (err) => {
        console.error("Firestore snapshot error:", err);
        setSaveError("Błąd połączenia z bazą danych.");
      }
    );
    return unsub;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Helpers ─────────────────────────────────────────────────────────────

  /**
   * Save a single item to Firestore.
   * If item.image is a data-URL (base64), upload to Storage first and
   * replace image with the download URL.
   */
  const saveItem = useCallback(async (item) => {
    try {
      let { image, storageKey } = item;

      // Detect base64 data-URL → upload to Storage
      if (image && image.startsWith("data:")) {
        // Delete old storage file first
        if (storageKey) await deleteImageFromStorage(storageKey);
        const result = await uploadImageToStorage(item.id, image);
        image = result.url;
        storageKey = result.storageKey;
      }

      // If image was cleared, remove old file from Storage
      if (!image && storageKey) {
        await deleteImageFromStorage(storageKey);
        storageKey = "";
      }

      await setDoc(doc(db, COLLECTION, item.id), {
        ...item,
        image,
        storageKey: storageKey || "",
      });
      setSaveError(null);
    } catch (err) {
      console.error("Błąd zapisu:", err);
      setSaveError("Nie udało się zapisać zmian. Sprawdź połączenie.");
    }
  }, []);

  /**
   * Persist the entire gallery array (used after add/remove operations).
   * Each item is written individually to Firestore.
   */
  const persist = useCallback(
    async (nextGallery) => {
      // Find removed items and delete them
      const nextIds = new Set(nextGallery.map((i) => i.id));
      for (const item of gallery) {
        if (!nextIds.has(item.id)) {
          // Delete from Firestore and Storage
          if (item.storageKey) await deleteImageFromStorage(item.storageKey);
          await deleteDoc(doc(db, COLLECTION, item.id)).catch(console.error);
        }
      }
      // Upsert all remaining items
      for (const item of nextGallery) {
        await saveItem(item);
      }
    },
    [gallery, saveItem]
  );

  /**
   * Debounced save — used while admin is typing in text fields.
   * Only saves the changed item after a short delay.
   */
  const scheduleSave = useCallback(
    (nextGallery, delay = 450) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        // Find items that changed
        const prevMap = new Map(gallery.map((i) => [i.id, i]));
        for (const item of nextGallery) {
          const prev = prevMap.get(item.id);
          if (!prev || JSON.stringify(prev) !== JSON.stringify(item)) {
            await saveItem(item);
          }
        }
      }, delay);
    },
    [gallery, saveItem]
  );

  return { gallery, persist, scheduleSave, saveError };
}
