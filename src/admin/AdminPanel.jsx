import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ImageOff, LogOut, Plus, Trash2, Upload, Leaf } from "lucide-react";
import { COLORS } from "../constants/colors";
import { compressImageFile, estimateDataUrlSizeKB } from "../utils/imageCompress";

function ImageUploadField({ item, onChange }) {
  const fileInputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setUploadError("");
    try {
      const dataUrl = await compressImageFile(file, 1100, 0.82);
      onChange(dataUrl);
    } catch (err) {
      setUploadError(err.message || "Nie udało się przesłać zdjęcia.");
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const sizeKB = estimateDataUrlSizeKB(item.image);

  return (
    <div>
      <label className="text-xs uppercase tracking-wide" style={{ color: COLORS.moss }}>
        Zdjęcie obrazu
      </label>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
          id={`file-${item.id}`}
        />
        <label
          htmlFor={`file-${item.id}`}
          className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer"
          style={{ background: COLORS.forest, color: COLORS.cream }}
        >
          <Upload size={14} /> {busy ? "Przesyłanie..." : "Wybierz plik z dysku"}
        </label>
        {item.image && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs px-3 py-2"
            style={{ color: "#a33", border: "1px solid #a33" }}
          >
            Usuń zdjęcie
          </button>
        )}
        {item.image && sizeKB > 0 && (
          <span className="text-xs" style={{ color: COLORS.charcoalSoft }}>
            ~{sizeKB} KB
          </span>
        )}
      </div>
      {uploadError && <p className="text-xs mt-1" style={{ color: "#a33" }}>{uploadError}</p>}
      <p className="text-xs mt-1" style={{ color: COLORS.charcoalSoft }}>
        Zdjęcia są automatycznie skalowane i zapisywane w Firebase Storage.
      </p>
    </div>
  );
}

export function AdminPanel({ gallery, persist, scheduleSave, saveError, onLogout }) {
  const [items, setItems] = useState(gallery);
  const [savedFlash, setSavedFlash] = useState(false);
  const flashTimer = useRef(null);

  useEffect(() => setItems(gallery), [gallery]);

  const flashSaved = () => {
    setSavedFlash(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setSavedFlash(false), 1400);
  };

  const updateField = (id, field, value) => {
    const next = items.map((it) => (it.id === id ? { ...it, [field]: value } : it));
    setItems(next);
    scheduleSave(next);
    flashSaved();
  };

  const removeItem = (id) => {
    if (!window.confirm("Usunąć ten obraz z galerii?")) return;
    const next = items.filter((it) => it.id !== id);
    setItems(next);
    persist(next);
    flashSaved();
  };

  const addItem = () => {
    const maxRef = items.reduce((m, it) => {
      const n = parseInt(it.ref, 10);
      return Number.isFinite(n) && n > m ? n : m;
    }, 0);
    const nextRef = String(maxRef + 1).padStart(3, "0");
    const newItem = { id: "img-" + Date.now(), ref: nextRef, title: "", description: "", image: "" };
    const next = [...items, newItem];
    setItems(next);
    persist(next);
    flashSaved();
  };

  return (
    <div style={{ background: COLORS.cream, minHeight: "100vh" }} className="font-body">
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-4"
        style={{ background: COLORS.forest, color: COLORS.cream }}
      >
        <div className="flex items-center gap-2">
          <Leaf size={18} color={COLORS.sageLight} />
          <span className="text-lg font-display" style={{ fontWeight: 600 }}>
            Panel administratora
          </span>
        </div>
        <div className="flex items-center gap-4">
          {savedFlash && (
            <span className="text-xs flex items-center gap-1" style={{ color: COLORS.sageLight }}>
              <Check size={14} /> Zapisano
            </span>
          )}
          <Link to="/" className="text-xs underline-grow" style={{ color: COLORS.cream }}>
            Wróć na stronę
          </Link>
          <button onClick={onLogout} className="flex items-center gap-1 text-xs" style={{ color: COLORS.cream }}>
            <LogOut size={14} /> Wyloguj
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <p className="text-sm" style={{ color: COLORS.charcoalSoft }}>
            Zmiany zapisują się automatycznie w Firebase. Liczba obrazów: {items.length}
          </p>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 text-sm"
            style={{ background: COLORS.wood, color: COLORS.cream }}
          >
            <Plus size={16} /> Dodaj obraz
          </button>
        </div>

        {saveError && (
          <div className="mb-6 px-4 py-3 text-sm" style={{ background: "#fbe9e9", color: "#a33", border: "1px solid #a33" }}>
            {saveError}
          </div>
        )}

        <div className="space-y-5">
          {items.map((it) => (
            <div
              key={it.id}
              className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-5 p-5"
              style={{ background: COLORS.linen, border: `1px solid ${COLORS.sageLight}` }}
            >
              <div
                className="aspect-[4/5] flex items-center justify-center overflow-hidden"
                style={{ background: COLORS.sageLight }}
              >
                {it.image ? (
                  <img src={it.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageOff size={24} color={COLORS.moss} />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wide" style={{ color: COLORS.moss }}>
                    Numer referencyjny
                  </label>
                  <input
                    value={it.ref}
                    onChange={(e) => updateField(it.id, "ref", e.target.value)}
                    placeholder="001"
                    className="w-full mt-1 px-3 py-2 text-sm outline-none"
                    style={{ border: `1px solid ${COLORS.sageLight}`, background: "#fff" }}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide" style={{ color: COLORS.moss }}>
                    Tytuł
                  </label>
                  <input
                    value={it.title}
                    onChange={(e) => updateField(it.id, "title", e.target.value)}
                    placeholder="Tytuł obrazu"
                    className="w-full mt-1 px-3 py-2 text-sm outline-none"
                    style={{ border: `1px solid ${COLORS.sageLight}`, background: "#fff" }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadField item={it} onChange={(val) => updateField(it.id, "image", val)} />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wide" style={{ color: COLORS.moss }}>
                    Opis
                  </label>
                  <textarea
                    value={it.description}
                    onChange={(e) => updateField(it.id, "description", e.target.value)}
                    placeholder="Technika, format, krótka historia pracy..."
                    rows={2}
                    className="w-full mt-1 px-3 py-2 text-sm outline-none resize-none"
                    style={{ border: `1px solid ${COLORS.sageLight}`, background: "#fff" }}
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    onClick={() => removeItem(it.id)}
                    className="flex items-center gap-1 text-xs px-3 py-1.5"
                    style={{ color: "#a33", border: "1px solid #a33" }}
                  >
                    <Trash2 size={13} /> Usuń obraz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
