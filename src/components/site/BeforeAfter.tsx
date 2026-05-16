import { useRef, useState } from "react";
import before from "@/assets/before-bouquet.jpg";
import after from "@/assets/after-resin.jpg";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(98, Math.max(2, p)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft select-none touch-none cursor-ew-resize"
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchEnd={() => (dragging.current = false)}
    >
      <img src={after} alt="After resin preservation" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt="Fresh bouquet before preservation"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
        />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="h-full w-px bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-gold text-primary-foreground shadow-gold">
          ‹›
        </div>
      </div>
      <div className="absolute top-4 left-4 bg-black/40 text-white text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full backdrop-blur">Before</div>
      <div className="absolute top-4 right-4 bg-gold text-primary-foreground text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full">After</div>
    </div>
  );
}
