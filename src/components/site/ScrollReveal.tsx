import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: guarantee visibility after 800ms + delay if observer doesn't fire
    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, 800 + delay);

    // If IntersectionObserver is not supported on this platform, immediately show
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
      { threshold: 0.05 } // Lower threshold for extremely reliable detection
    );
    
    io.observe(el);
    
    return () => {
      clearTimeout(fallbackTimer);
      io.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`cinematic-blur ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  );
}
