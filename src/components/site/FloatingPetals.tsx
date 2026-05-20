import { useEffect, useRef } from "react";

export function FloatingPetals({ count = 7 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.cssText = `
        left: ${Math.random() * 48}%;
        animation-duration: ${6 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 8}s;
        --drift: ${(Math.random() - 0.5) * 80}px;
        width: ${10 + Math.random() * 10}px;
        height: ${10 + Math.random() * 10}px;
        opacity: ${0.25 + Math.random() * 0.35};
      `;
      container.appendChild(petal);
    }
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    />
  );
}
