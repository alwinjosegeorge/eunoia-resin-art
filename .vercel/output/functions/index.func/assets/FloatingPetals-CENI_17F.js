import { W as reactExports, L as jsxRuntimeExports } from "./server-DAJe76I7.js";
function FloatingPetals({ count = 7 }) {
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: containerRef,
      className: "pointer-events-none absolute inset-0 z-10",
      "aria-hidden": "true"
    }
  );
}
export {
  FloatingPetals as F
};
