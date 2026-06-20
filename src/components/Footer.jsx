import { Link } from "react-router-dom";
import { COLORS } from "../constants/colors";

export function Footer() {
  return (
    <footer className="px-5 sm:px-8 py-8 text-center font-body" style={{ background: COLORS.forestDark, color: COLORS.sageLight }}>
      <Link to="/admin" className="text-xs opacity-40 hover:opacity-70 transition-opacity">
        © {new Date().getFullYear()} Helena Lebiecka
      </Link>
    </footer>
  );
}
