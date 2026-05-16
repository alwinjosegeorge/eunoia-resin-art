import { createFileRoute, Link } from "@tanstack/react-router";
import wedding from "@/assets/wedding-hero.jpg";
import before from "@/assets/before-bouquet.jpg";
import after from "@/assets/after-resin.jpg";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FloatingPetals } from "@/components/site/FloatingPetals";
import { OrderJourney } from "@/components/site/OrderJourney";
import { ArrowRight, Heart } from "lucide-react";

export const Route = createFileRoute("/wedding")({
  head: () => ({
    meta: [
      { title: "Wedding Bouquet Preservation — Eternalise Your Day | Eunoia" },
      { name: "description", content: "Preserve your bridal bouquet in museum-grade resin. Luxury handcrafted wedding flower memory art by Manjima." },
    ],
  }),
  component: WeddingPage,
});

function WeddingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <FloatingPetals count={16} />
        <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-5">Wedding Preservation Atelier</div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight">
              Your wedding day, <em className="font-serif italic">eternal</em>.
            </h1>
            <p className="mt-7 text-muted-foreground leading-relaxed max-w-md">
              The bouquet you carried down the aisle deserves more than a memory in a photograph. Preserve every petal in crystal-clear resin, framed in your choice of teak, brass or hand-cast deepcast.
            </p>
            <Link to="/custom" className="mt-9 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-gold transition">
              Begin Your Heirloom <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-10 flex gap-8 text-xs text-muted-foreground">
              <div><span className="text-gold font-display text-2xl block">1,200+</span>Brides preserved</div>
              <div><span className="text-gold font-display text-2xl block">45</span>Day delicate process</div>
              <div><span className="text-gold font-display text-2xl block">∞</span>Lifetime guarantee</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <img src={wedding} alt="Preserved bridal bouquet in crystal resin" loading="lazy" className="rounded-2xl shadow-soft w-full" />
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">The Transformation</div>
            <h2 className="font-display text-4xl md:text-5xl">From aisle to heirloom</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal><BeforeAfter /></ScrollReveal>
      </section>

      <section className="bg-blush/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Your 45-Day Journey</div>
              <h2 className="font-display text-4xl md:text-5xl">Every step, treated as sacred</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal><OrderJourney current={2} /></ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: before, t: "Send Us Your Bouquet", d: "Within 5 days of your wedding, refrigerate and ship overnight — we'll provide the kit and instructions." },
            { img: after, t: "Design Together", d: "A 1:1 design call with Manjima to choose your frame, depth, flowers and the story you want preserved." },
            { img: wedding, t: "Receive Your Heirloom", d: "Your finished piece arrives in our signature silk-lined box, sealed with gold wax. Pass it to your children." },
          ].map((s, i) => (
            <ScrollReveal key={s.t} delay={i * 120}>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition duration-1000" />
                </div>
                <div className="font-display text-2xl">{s.t}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 text-center">
        <ScrollReveal>
          <Heart className="mx-auto h-7 w-7 text-gold mb-5" />
          <h2 className="font-display text-3xl md:text-4xl">Crafted To Last Forever.</h2>
          <Link to="/custom" className="mt-8 inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:opacity-90 transition">
            Preserve Your Forever <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
