import { useEffect, useState } from "react";

export function LoaderScreen() {
  const [shown, setShown] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShown(false), 3200);
    return () => clearTimeout(t);
  }, []);
  if (!shown) return null;
  return (
    <div className="loader-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory">
      <div className="loader-bloom">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.08 82)" />
              <stop offset="100%" stopColor="oklch(0.58 0.12 70)" />
            </linearGradient>
          </defs>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx="60"
              cy="38"
              rx="14"
              ry="26"
              fill="url(#g)"
              opacity="0.85"
              transform={`rotate(${a} 60 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="9" fill="oklch(0.85 0.12 80)" />
        </svg>
      </div>
      <div className="mt-6 font-display text-2xl tracking-wide text-charcoal">Eunoia</div>
      <div className="mt-1 text-[10px] tracking-[0.4em] text-gold uppercase">Resin Art</div>
    </div>
  );
}
