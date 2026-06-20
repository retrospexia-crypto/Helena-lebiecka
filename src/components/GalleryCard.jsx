import { ImageOff } from "lucide-react";
import { COLORS } from "../constants/colors";

export function GalleryCard({ item }) {
  return (
    <div
      className="group rounded-sm overflow-hidden flex flex-col"
      style={{ background: COLORS.linen, border: `1px solid ${COLORS.sageLight}` }}
    >
      <div
        className="relative w-full aspect-[4/5] flex items-center justify-center overflow-hidden"
        style={{ background: COLORS.sageLight }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title || "Obraz Heleny Lebieckiej"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-6 text-center" style={{ color: COLORS.moss }}>
            <ImageOff size={28} strokeWidth={1.3} />
            <span className="text-xs font-body">Zdjęcie w przygotowaniu</span>
          </div>
        )}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 text-xs tracking-widest font-body"
          style={{ background: "rgba(47,61,44,0.85)", color: COLORS.cream, letterSpacing: "0.12em" }}
        >
          Nr {item.ref}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3
          className="text-xl sm:text-2xl mb-2 font-display"
          style={{ color: COLORS.forest, fontWeight: 600 }}
        >
          {item.title || "Bez tytułu"}
        </h3>
        <p className="text-sm leading-relaxed flex-1 font-body" style={{ color: COLORS.charcoalSoft }}>
          {item.description || "Opis tej pracy pojawi się wkrótce."}
        </p>
      </div>
    </div>
  );
}
