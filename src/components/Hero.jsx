import { ChevronRight } from "lucide-react";
import { COLORS } from "../constants/colors";
import { FernWatermark } from "./Fern";
import helenaPhoto from "../assets/helena.jpg";

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section
      id="start"
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-8 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${COLORS.cream} 0%, #EFE9D8 100%)` }}
    >
      <FernWatermark style={{ top: "-40px", right: "-60px", width: "340px", height: "340px" }} />
      <FernWatermark
        style={{ bottom: "-60px", left: "-80px", width: "300px", height: "300px", transform: "scaleX(-1) rotate(8deg)" }}
      />

      <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div>
          <p className="uppercase text-xs sm:text-sm mb-5 font-body" style={{ color: COLORS.wood, letterSpacing: "0.25em" }}>
            Malarstwo nieprofesjonalne · Zielona Góra
          </p>
          <h1
            className="leading-[1.05] mb-6 font-display"
            style={{ color: COLORS.forest, fontWeight: 600, fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)" }}
          >
            Malarstwo rodem
            <br />
            <span style={{ fontStyle: "italic", color: COLORS.moss }}>z natury i pamięci</span>
          </h1>
          <p className="text-base sm:text-lg max-w-md mb-9 font-body" style={{ color: COLORS.charcoalSoft, lineHeight: 1.75 }}>
            Helena Lebiecka — artystka z Zielonej Góry, dla której pędzel stał się sposobem
            opowiadania o świecie po latach odkładanych marzeń.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={() => scrollTo("galeria")}
              className="px-7 py-3 text-sm tracking-wide inline-flex items-center gap-2 font-body"
              style={{ background: COLORS.forest, color: COLORS.cream }}
            >
              Zobacz galerię <ChevronRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("o-mnie")}
              className="text-sm tracking-wide underline-grow font-body"
              style={{ color: COLORS.forest }}
            >
              Poznaj historię
            </button>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: "min(82vw, 380px)",
              height: "min(82vw, 380px)",
              border: `10px solid ${COLORS.linen}`,
              boxShadow: "0 30px 60px -20px rgba(47,61,44,0.35)",
            }}
          >
            <img src={helenaPhoto} alt="Helena Lebiecka" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute -bottom-4 -left-4 sm:-left-8 rounded-full flex items-center justify-center text-center px-3 font-display"
            style={{ width: "108px", height: "108px", background: COLORS.wood, color: COLORS.cream, transform: "rotate(-8deg)" }}
          >
            <span style={{ fontSize: "0.95rem", lineHeight: 1.25 }}>Grupa Plastyczna „Kontrapost”</span>
          </div>
        </div>
      </div>
    </section>
  );
}
