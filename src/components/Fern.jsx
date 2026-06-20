import { Leaf } from "lucide-react";
import { COLORS } from "../constants/colors";

export function FernSprig({ className = "", style = {}, color = COLORS.sage, opacity = 1 }) {
  return (
    <svg viewBox="0 0 200 60" className={className} style={{ opacity, ...style }} fill="none">
      <path d="M2 50 C40 50 70 35 100 30" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {[...Array(8)].map((_, i) => {
        const x = 14 + i * 11;
        const y = 49 - i * 2.4;
        const len = 13 - i * 0.6;
        return (
          <g key={i}>
            <path
              d={`M${x} ${y} Q${x + len * 0.5} ${y - len * 0.9} ${x + len} ${y - len * 0.3}`}
              stroke={color}
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d={`M${x} ${y} Q${x + len * 0.5} ${y + len * 0.9} ${x + len} ${y + len * 0.3}`}
              stroke={color}
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function FernDivider({ flip = false, color = COLORS.sage }) {
  return (
    <div className="flex items-center justify-center gap-4 select-none" aria-hidden="true">
      <div className="h-px w-12 sm:w-20" style={{ background: color, opacity: 0.5 }} />
      <FernSprig
        color={color}
        className="w-16 h-5 sm:w-20 sm:h-6"
        style={{ transform: flip ? "scaleX(-1)" : "none" }}
      />
      <Leaf size={14} color={color} style={{ opacity: 0.8 }} />
      <FernSprig
        color={color}
        className="w-16 h-5 sm:w-20 sm:h-6"
        style={{ transform: flip ? "none" : "scaleX(-1)" }}
      />
      <div className="h-px w-12 sm:w-20" style={{ background: color, opacity: 0.5 }} />
    </div>
  );
}

export function FernWatermark({ style = {}, className = "" }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      <g opacity="0.08">
        <path d="M30 380 C120 360 220 300 260 180" stroke={COLORS.forest} strokeWidth="2.5" fill="none" />
        {[...Array(11)].map((_, i) => {
          const t = i / 10;
          const x = 30 + t * 230;
          const y = 380 - t * 200 * 0.95 - i * 1.5;
          const len = 46 - i * 2.6;
          return (
            <g key={i}>
              <path
                d={`M${x} ${y} Q${x + len * 0.6} ${y - len * 0.8} ${x + len} ${y - len * 0.1}`}
                stroke={COLORS.forest}
                strokeWidth="2"
                fill="none"
              />
              <path
                d={`M${x} ${y} Q${x + len * 0.6} ${y + len * 0.8} ${x + len} ${y + len * 0.1}`}
                stroke={COLORS.forest}
                strokeWidth="2"
                fill="none"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
