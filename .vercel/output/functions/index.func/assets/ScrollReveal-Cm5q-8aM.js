import { W as reactExports, L as jsxRuntimeExports } from "./server-DAJe76I7.js";
function ScrollReveal({
  children,
  delay = 0,
  className = ""
}) {
  const ref = reactExports.useRef(null);
  const [inView, setInView] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, 800 + delay);
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      clearTimeout(fallbackTimer);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setInView(true), delay);
          clearTimeout(fallbackTimer);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
      // Lower threshold for extremely reliable detection
    );
    io.observe(el);
    return () => {
      clearTimeout(fallbackTimer);
      io.disconnect();
    };
  }, [delay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: `cinematic-blur ${inView ? "in-view" : ""} ${className}`, children });
}
export {
  ScrollReveal as S
};
