/**
 * Reads an image File from disk, resizes it (max width) and re-encodes it as
 * a compressed JPEG data URL. This keeps localStorage usage reasonable since
 * the whole gallery is persisted as JSON in the browser.
 *
 * @param {File} file
 * @param {number} maxWidth
 * @param {number} quality 0..1
 * @returns {Promise<string>} data URL
 */
export function compressImageFile(file, maxWidth = 1100, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Wybrany plik nie jest obrazem."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Nie udało się wczytać pliku."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Nie udało się wczytać obrazu."));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/** Rough estimate (in KB) of how much space a base64 data URL occupies. */
export function estimateDataUrlSizeKB(dataUrl) {
  if (!dataUrl) return 0;
  const base64 = dataUrl.split(",")[1] || "";
  return Math.round((base64.length * 0.75) / 1024);
}
