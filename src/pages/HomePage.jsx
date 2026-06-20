import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Gallery } from "../components/Gallery";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { COLORS } from "../constants/colors";

export function HomePage({ gallery }) {
  return (
    <div className="min-h-screen font-body" style={{ background: COLORS.cream, color: COLORS.charcoal }}>
      <Nav />
      <Hero />
      <About />
      <Gallery gallery={gallery} />
      <Contact />
      <Footer />
    </div>
  );
}
