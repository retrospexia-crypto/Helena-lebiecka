import { COLORS } from "../constants/colors";
import { FernDivider } from "./Fern";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Reveal>
      <section id="o-mnie" className="px-5 sm:px-8 py-24" style={{ background: COLORS.linen }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Biografia</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-display" style={{ color: COLORS.forest, fontWeight: 600 }}>
              O mnie
            </h2>
            <div className="mt-6">
              <FernDivider />
            </div>
          </div>

          <div className="space-y-6 text-base sm:text-lg font-body" style={{ color: COLORS.charcoal, lineHeight: 1.85 }}>
            <p>
              Moja przygoda z malarstwem rozpoczęła się po przejściu na emeryturę — był to moment,
              w którym postanowiłam spełnić marzenia towarzyszące mi przez całe życie.
            </p>
            <p>
              Pierwsze kroki stawiałam w Uniwersytecie Trzeciego Wieku w Zielonej Górze, pod opieką
              artysty malarza <strong style={{ color: COLORS.forest }}>Leopolda Kolbiarza</strong>. W roku{" "}
              <strong style={{ color: COLORS.forest }}>2002</strong> dołączyłam do{" "}
              <strong style={{ color: COLORS.forest }}>Grupy Plastycznej „Kontrapost”</strong>, z którą
              współpracuję do dziś.
            </p>
            <p>
              Poza malarstwem pasjonuję się <strong style={{ color: COLORS.forest }}>fotografią i turystyką</strong>,
              a swoje umiejętności plastyczne rozwijam w{" "}
              <strong style={{ color: COLORS.forest }}>Zielonogórskim Ośrodku Kultury (ZOK)</strong>. Należę
              również do <strong style={{ color: COLORS.forest }}>Stowarzyszenia Zielonogórskich Rękodzielników</strong>.
            </p>
            <p>
              Brałam udział w licznych <strong style={{ color: COLORS.forest }}>plenerach krajowych i międzynarodowych</strong> —
              m.in. w Zielonej Górze, Gorzowie Wielkopolskim, Kożuchowie, Frýdlancie, Nové Město, Wilnie,
              Lübbenau i Cottbus. Wiedzę pogłębiałam podczas warsztatów prowadzonych przez wybitnych
              artystów, takich jak <strong style={{ color: COLORS.forest }}>Leopold Kolbiarz, Henryk Krakowiak,
              Adam Bagiński</strong> i <strong style={{ color: COLORS.forest }}>Irena Biewiaczonek</strong>.
            </p>
            <p>
              Moje prace były prezentowane na wielu wystawach indywidualnych i zbiorowych, a także
              wyróżniane w konkursach — w tym w ramach{" "}
              <strong style={{ color: COLORS.forest }}>Lubuskiej Twórczości Nieprofesjonalnej</strong> w
              Zielonej Górze.
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
