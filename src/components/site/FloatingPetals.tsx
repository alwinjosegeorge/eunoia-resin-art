import { useMemo } from "react";

export function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 16 + Math.random() * 18,
        drift: (Math.random() - 0.5) * 220,
        scale: 0.6 + Math.random() * 1.1,
        hue: Math.random() > 0.5 ? 25 : 82,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.scale})`,
            // @ts-expect-error css var
            "--drift": `${p.drift}px`,
            background: `linear-gradient(135deg, oklch(0.92 0.05 ${p.hue}), oklch(0.85 0.1 82))`,
          }}
        />
      ))}
    </div>
  );
}
