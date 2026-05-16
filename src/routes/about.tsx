import { createFileRoute, Link } from "@tanstack/react-router";
import founder from "@/assets/founder.jpg";
import process from "@/assets/process-pour.jpg";
import packagingImg from "@/assets/packaging.jpg";
import teak from "@/assets/product-teakframe.jpg";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ArrowRight, Award, Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Manjima & The Alchemy of Preservation | Eunoia" },
      { name: "description", content: "Meet Manjima, founder of Eunoia Resin Art. Discover the slow craft of preserving flowers in liquid glass from our Kerala studio." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-14 items-center">
        <ScrollReveal>
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">The Soul Behind The Art</div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight">
            Manjima — <em className="font-serif italic">Founder</em> of Eunoia Resin Art.
          </h1>
          <p className="mt-7 text-muted-foreground leading-relaxed">
            Every piece created at Eunoia is a conversation between raw fluidity and intentional design. What started as a personal quest for serenity grew into a boutique studio where passion meets resin.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            I believe that art shouldn't just be seen — it should be felt. Each pour captures a moment of <em>'Eunoia'</em>, the beautiful thinking, in every handcrafted layer.
          </p>
          <div className="mt-8 border-l-2 border-gold pl-5 font-serif italic text-lg">
            "My process is a slow dance with materials — ensuring each bubble, swirl and gold flake is exactly where it's meant to be."
          </div>
          <div className="mt-8 text-[10px] tracking-[0.4em] uppercase text-gold">EST. 2021 · Kerala, India</div>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <img src={founder} alt="Manjima, founder of Eunoia Resin Art, at her boutique studio" loading="lazy" className="rounded-2xl shadow-soft w-full" />
        </ScrollReveal>
      </section>

      {/* Alchemy / Process */}
      <section className="bg-blush/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Behind The Art</div>
              <h2 className="font-display text-4xl md:text-5xl">The Alchemy of Creation</h2>
              <p className="mt-5 text-muted-foreground">Behind every finished masterpiece lies days of meticulous pouring, sanding and curing in our Calicut studio.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] group">
                <img src={process} alt="The initial pour" className="h-full w-full object-cover group-hover:scale-105 transition duration-1000" />
                <div className="absolute bottom-5 left-5 text-white font-display text-2xl">The Initial Pour</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] group">
                <img src={teak} alt="Curing stage" className="h-full w-full object-cover group-hover:scale-105 transition duration-1000" />
                <div className="absolute bottom-5 left-5 text-white font-display text-2xl">Curing Stage</div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] group">
                <img src={packagingImg} alt="Boutique workspace" className="h-full w-full object-cover group-hover:scale-105 transition duration-1000" />
                <div className="absolute bottom-5 left-5 text-white font-display text-2xl">Refining Edges</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] group">
                <img src={founder} alt="Boutique workspace" className="h-full w-full object-cover group-hover:scale-105 transition duration-1000" />
                <div className="absolute bottom-5 left-5 text-white font-display text-2xl">Boutique Workspace</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Resin */}
      <section className="mx-auto max-w-6xl px-6 py-28 grid md:grid-cols-3 gap-8">
        {[
          { icon: Heart, title: "Why Resin Art Matters", text: "Resin holds time. It captures a single moment — a wedding day, a first bloom — and freezes it in crystal clarity for generations." },
          { icon: Sparkles, title: "How We Preserve Flowers", text: "Each bloom is dried, pressed and treated by hand over 21 days before being placed in museum-grade epoxy that won't yellow over time." },
          { icon: Award, title: "Trusted By Hundreds", text: "Over 1,200 brides, mothers and families have entrusted us with their most precious memories since 2021." },
        ].map((b, i) => (
          <ScrollReveal key={b.title} delay={i * 100}>
            <div className="glass-card rounded-2xl p-7 h-full">
              <b.icon className="h-6 w-6 text-gold" />
              <h3 className="font-display text-xl mt-4">{b.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* Customer Memory Stories */}
      <section className="bg-secondary/40 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Customer Memory Stories</div>
              <h2 className="font-display text-4xl md:text-5xl">Stories woven in resin</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Aditi, Bengaluru", "Wedding bouquet preservation", "Manjima preserved the bouquet my grandmother held on her wedding day, 64 years ago. There are no words."],
              ["Neha, Mumbai", "First-baby keepsake", "Holding our daughter's first dried flower preserved in gold flake — I cry every time I look at it."],
              ["Rahul, Goa", "Memorial tribute", "My mother loved jasmine. Manjima preserved the last stem from her garden. It now sits on my mantle, eternal."],
            ].map(([name, type, text], i) => (
              <ScrollReveal key={name} delay={i * 120}>
                <div className="glass-card rounded-2xl p-7 h-full">
                  <p className="font-serif italic text-lg leading-relaxed">"{text}"</p>
                  <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-gold">{name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{type}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-28 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl">Crafted To Last Forever.</h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Begin a conversation. Your memory is safe in Manjima's hands.</p>
          <Link to="/custom" className="mt-9 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-gold transition">
            Book Your Custom Piece <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
