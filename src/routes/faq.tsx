import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Eunoia Resin Art" },
      { name: "description", content: "Everything about our resin art process, custom commissions, shipping, packaging and care." },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  { q: "How long does a custom commission take?", a: "Most pieces require 32–45 days from start to finish — the flowers must be properly dried, the resin must cure in layers, and each piece is hand-polished." },
  { q: "Do you ship internationally?", a: "Yes — we ship worldwide with insured, fragile-safe packaging. Shipping is complimentary on all custom commissions above ₹8,000." },
  { q: "Will my flowers retain their colour?", a: "We use museum-grade UV-stable epoxy and proprietary drying techniques. Colours stay vibrant for generations when displayed away from direct sunlight." },
  { q: "Can I preserve flowers from a memorial?", a: "Absolutely. Memorial preservation is one of our most cherished services — we treat every piece with the utmost care and discretion." },
  { q: "What if my bouquet is wilted?", a: "Even if your bouquet has begun to wilt, we can almost always preserve it. Refrigerate it immediately and ship overnight — we'll handle the rest." },
  { q: "Can I include other mementos with the flowers?", a: "Yes — wedding rings, ribbons, locks of hair, baby teeth, handwritten notes. Tell Manjima during your commission consultation." },
  { q: "How do I care for my finished piece?", a: "Wipe gently with a soft microfibre cloth. Avoid harsh chemicals and direct sunlight. Each piece arrives with a detailed care card." },
  { q: "Do you offer gift wrapping?", a: "Every piece arrives in our signature silk-lined box with satin ribbon and gold wax seal — already gift-ready." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <ScrollReveal>
        <div className="text-center mb-14">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Frequently Asked</div>
          <h1 className="font-display text-5xl md:text-6xl">Your questions, answered.</h1>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <ScrollReveal key={f.q} delay={i * 50}>
            <div className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-display text-lg">{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-gold shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
