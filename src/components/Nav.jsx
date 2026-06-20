import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { COLORS } from "../constants/colors";

const NAV_ITEMS = [
  { id: "start", label: "Strona główna" },
  { id: "o-mnie", label: "O mnie" },
  { id: "galeria", label: "Galeria" },
  { id: "kontakt", label: "Kontakt" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? COLORS.cream : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(47,61,44,0.12)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <button onClick={() => scrollTo("start")} className="flex items-center gap-2 font-display">
          <Leaf size={20} color={COLORS.wood} />
          <span className="text-xl sm:text-2xl" style={{ color: COLORS.forest, fontWeight: 600 }}>
            Helena Lebiecka
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-sm tracking-wide underline-grow font-body"
              style={{ color: COLORS.forest, letterSpacing: "0.04em" }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <X color={COLORS.forest} /> : <Menu color={COLORS.forest} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-5 pb-6 flex flex-col gap-4" style={{ background: COLORS.cream }}>
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-left text-base font-body"
              style={{ color: COLORS.forest }}
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
