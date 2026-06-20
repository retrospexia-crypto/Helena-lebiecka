import { COLORS } from "../constants/colors";
import { FernDivider } from "./Fern";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { GalleryCard } from "./GalleryCard";

export function Gallery({ gallery }) {
  return (
    <Reveal>
      <section id="galeria" className="px-5 sm:px-8 py-24" style={{ background: COLORS.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Wybrane prace</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-display" style={{ color: COLORS.forest, fontWeight: 600 }}>
              Galeria obrazów
            </h2>
            <div className="mt-6">
              <FernDivider />
            </div>
          </div>

          {gallery.length === 0 ? (
            <p className="text-center font-body" style={{ color: COLORS.charcoalSoft }}>
              Galeria jest obecnie w przygotowaniu.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {gallery.map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Reveal>
  );
}
