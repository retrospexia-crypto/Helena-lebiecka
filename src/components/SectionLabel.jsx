import { COLORS } from "../constants/colors";

export function SectionLabel({ children }) {
  return (
    <p
      className="uppercase text-xs sm:text-sm font-medium mb-3 font-body"
      style={{ color: COLORS.wood, letterSpacing: "0.22em" }}
    >
      {children}
    </p>
  );
}
