import { useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Opening the package felt truly emotional. Every detail was preserved beautifully, turning our wedding memories into something timeless.",
    name: "Alwin Jose George",
    role: "Wedding Memory Preservation Client",
    location: "Poonjar",
  },
  {
    text: "The quality and presentation are absolutely premium. From the handcrafted finish to the emotional detailing, everything felt personal and meaningful. Truly one of the best custom gifting experiences.",
    name: "Joe Martin",
    role: "Premium Keepsake Collection Client",
    location: "Kottayam",
  },
  {
    text: "The moment I opened the package, I was speechless. Every flower, every detail, and every memory was preserved with so much care and elegance. It feels more like a luxury keepsake than just resin art.",
    name: "Nikkita Anna George",
    role: "Custom Floral Resin Art Client",
    location: "Kochi",
  },
  {
    text: "Beautifully handcrafted and professionally finished. The attention to detail, premium packaging, and overall experience were exceptional. Eunoia Resin Art creates memories that genuinely last forever.",
    name: "Luqmanul Hakim",
    role: "Luxury Resin Art Collection Client",
    location: "Malappuram",
  },
  {
    text: "I never imagined flowers could be preserved this beautifully. The final artwork looked elegant, emotional, and luxurious. You can genuinely feel the love and effort behind every piece.",
    name: "Anna Shibu",
    role: "Bridal Bouquet Preservation Client",
    location: "Thrissur",
  },
];

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const INTERVAL = 5000;

  const goTo = useCallback(
    (index: number) => {
      setVisible(false);
      setTimeout(() => {
        setActive((index + testimonials.length) % testimonials.length);
        setVisible(true);
      }, 400);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(active + 1);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [active, goTo]);

  const t = testimonials[active];

  return (
    <section className="mx-auto max-w-4xl px-6 py-14 text-center select-none">
      {/* Decorative quote icon */}
      <div className="flex justify-center mb-8">
        <div className="h-12 w-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
          <Quote className="h-5 w-5 text-gold" />
        </div>
      </div>

      {/* Review text */}
      <div
        style={{
          transition: "opacity 0.6s cubic-bezier(.4,0,.2,1), filter 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)",
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : "blur(4px)",
          transform: visible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <p className="font-serif italic text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground max-w-3xl mx-auto">
          "{t.text}"
        </p>

        <div className="mt-8 space-y-1">
          <div className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium">
            {t.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {t.role} · {t.location}
          </div>
        </div>
      </div>

      {/* Dots + Arrows row */}
      <div className="mt-10 flex items-center justify-center gap-6">
        {/* Left arrow */}
        <button
          onClick={() => goTo(active - 1)}
          className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all opacity-50 hover:opacity-100"
          aria-label="Previous review"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Review ${i + 1}`}
              className="transition-all duration-500"
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                background: i === active ? "var(--gold)" : "var(--border)",
                opacity: i === active ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goTo(active + 1)}
          className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all opacity-50 hover:opacity-100"
          aria-label="Next review"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
