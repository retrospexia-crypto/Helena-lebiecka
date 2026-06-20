import { Mail } from "lucide-react";
import { COLORS } from "../constants/colors";
import { FernDivider, FernWatermark } from "./Fern";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <Reveal>
      <section
        id="kontakt"
        className="relative px-5 sm:px-8 py-24 overflow-hidden"
        style={{ background: COLORS.forest, color: COLORS.cream }}
      >
        <FernWatermark style={{ top: "-20px", left: "-40px", width: "280px", height: "280px" }} />
        <div className="max-w-2xl mx-auto text-center relative">
          <SectionLabel>Napiszmy razem</SectionLabel>
          <h2 className="text-3xl sm:text-4xl mb-6 font-display" style={{ fontWeight: 600 }}>
            Kontakt
          </h2>
          <p className="mb-8 text-base sm:text-lg font-body" style={{ color: COLORS.sageLight, lineHeight: 1.7 }}>
            Jeśli interesuje Cię zakup obrazu, udział w plenerze lub po prostu chcesz porozmawiać
            o sztuce — napisz.
          </p>
          <a
            href="mailto:retrospexia@gmail.com"
            className="inline-flex items-center gap-3 px-7 py-3 text-sm sm:text-base tracking-wide font-body"
            style={{ background: COLORS.wood, color: COLORS.cream }}
          >
            <Mail size={18} /> retrospexia@gmail.com
          </a>
          <div className="mt-12">
            <FernDivider color={COLORS.sage} />
          </div>
        </div>
      </section>
    </Reveal>
  );
}
