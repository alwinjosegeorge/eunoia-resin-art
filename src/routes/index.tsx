import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote, Sparkles, Heart } from "lucide-react";
import hero from "@/assets/hero-bouquet.jpg";
import process from "@/assets/process-pour.jpg";
import packagingImg from "@/assets/packaging.jpg";
import { products, formatINR } from "@/data/products";
import { FloatingPetals } from "@/components/site/FloatingPetals";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TrustStrip } from "@/components/site/TrustStrip";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { MemoryDate } from "@/components/site/MemoryDate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eunoia Resin Art — Preserving Your Precious Memories Forever" },
      { name: "description", content: "Luxury handcrafted resin art. Preserve bridal bouquets, baby keepsakes & life's most precious moments in timeless crystal resin." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <FloatingPetals />
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 grid lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6 relative z-10">
            <ScrollReveal>
              <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-6">
                ✦ A Boutique Atelier in Kerala ✦
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-charcoal">
                Preserving Your <br />
                <em className="font-serif italic shimmer-text">Precious Memories</em> <br />
                Forever.
              </h1>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
                Bridal bouquets. Baby keepsakes. The flowers from the night they said yes. We transform fleeting beauty into heirlooms cast in crystal resin and champagne gold.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/custom"
                  className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.18em] uppercase hover:bg-gold transition-all"
                >
                  Preserve Your Forever
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/shop"
                  className="text-sm tracking-[0.18em] uppercase border-b border-gold pb-1 text-foreground hover:text-gold transition"
                >
                  Explore Collection
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-gold" /> Handcrafted in Calicut</div>
                <div className="flex items-center gap-2"><Heart className="h-3.5 w-3.5 text-gold" /> Trusted by 1,200+ couples</div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 relative">
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-blush/60 via-transparent to-gold-light/30 rounded-full blur-3xl" />
                <img
                  src={hero}
                  alt="Handcrafted resin art with preserved pink roses and gold leaf"
                  width={1600}
                  height={1200}
                  className="relative rounded-2xl shadow-soft w-full aspect-square object-cover"
                />
                <div className="absolute -bottom-6 -left-6 glass-card rounded-xl px-5 py-3 shadow-soft">
                  <div className="font-serif italic text-sm">Handcrafted with soul.</div>
                  <div className="text-[10px] tracking-[0.3em] text-gold uppercase mt-1">— Manjima</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">Curated Series</div>
            <h2 className="font-display text-4xl md:text-5xl">Signature Collections</h2>
            <div className="gold-divider mx-auto w-24 mt-6" />
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 120}>
              <Link to="/product/$id" params={{ id: p.id }} className="block group hover-lift">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                    <div className="font-display text-2xl">{p.name}</div>
                    <div className="text-xs text-white/80 mt-1">{p.tagline}</div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-blush/30 py-28">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
              <img src={process} alt="Artist pouring resin over flowers" loading="lazy" className="rounded-2xl shadow-soft w-full" />
              <div className="absolute -bottom-8 -right-6 bg-ivory rounded-xl px-6 py-4 shadow-soft max-w-[220px]">
                <Quote className="h-5 w-5 text-gold" />
                <p className="font-serif italic text-sm mt-2">Handcrafted with soul.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">Our Philosophy</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">Turning Flowers Into Forever.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We believe memories are the most precious things we own. Whether it's a bridal bouquet, a baby's first tooth, or a memorial tribute, we transform these fleeting moments into timeless, crystalline art.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Each piece is meticulously hand-poured in our boutique studio, using museum-grade resin that ensures your treasures remain vibrant for generations to come.
            </p>
            <Link to="/about" className="mt-8 inline-block text-sm tracking-[0.2em] uppercase border-b border-gold pb-1 hover:text-gold transition">
              Learn Our Process →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <ScrollReveal>
            <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">The Transformation</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">From fresh bloom to <em className="font-serif italic">eternal heirloom</em>.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Drag the slider to witness the alchemy. Every petal you see was once held by a bride, a mother, a beloved. Now it lives forever — suspended in crystal, framed in gold.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                ["32–45", "Days of careful preservation"],
                ["100%", "Hand-poured, never machine made"],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <div className="font-display text-3xl text-gold">{k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{v}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <BeforeAfter />
          </ScrollReveal>
        </div>
      </section>

      {/* MEMORY DATE */}
      <section className="bg-secondary/40 py-28">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">Every Date Has A Story</div>
              <h2 className="font-display text-4xl md:text-5xl">Mark the moment, forever.</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <MemoryDate />
          </ScrollReveal>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-3">Most Loved</div>
              <h2 className="font-display text-4xl md:text-5xl">Gallery Best Sellers</h2>
            </div>
            <Link to="/shop" className="hidden md:inline-block text-sm tracking-[0.2em] uppercase border-b border-gold pb-1 hover:text-gold">View all →</Link>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 100}>
              <Link to="/product/$id" params={{ id: p.id }} className="block group hover-lift">
                <div className="relative overflow-hidden rounded-xl aspect-square bg-secondary">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-foreground text-background text-[9px] tracking-[0.25em] uppercase px-2 py-1 rounded">{p.badge}</span>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <div className="font-display text-lg">{p.name}</div>
                  <div className="text-gold text-sm mt-1">{formatINR(p.price)}</div>
                  <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground border-t border-border pt-3 group-hover:text-gold">Add to cart</div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PACKAGING */}
      <section className="bg-blush/30 py-28">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">The Unboxing</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">A luxury <em className="font-serif italic">arrival ritual</em>.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Your piece arrives nestled in silk, sealed with our champagne gold wax stamp, and accompanied by a handwritten note from Manjima.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {["Satin ribbon wrap", "Gold wax seal", "Handwritten note", "Fragile-safe foam", "Signature gift box", "Dried petal sachet"].map((x) => (
                <li key={x} className="flex items-center gap-2"><span className="text-gold">✦</span>{x}</li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <img src={packagingImg} alt="Premium gift packaging with satin ribbon and gold wax seal" loading="lazy" className="rounded-2xl shadow-soft w-full" />
          </ScrollReveal>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <ScrollReveal>
          <Quote className="mx-auto h-8 w-8 text-gold mb-6" />
          <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-foreground">
            "I cried when I opened my package. Seeing my wedding flowers preserved so beautifully in the teak frame was more than I could have ever hoped for. Manjima's attention to detail is just incredible."
          </p>
          <div className="mt-8 text-[10px] tracking-[0.4em] uppercase text-gold">Sarah Mitchell</div>
          <div className="text-xs text-muted-foreground mt-1">Wedding Preservation Client · Bengaluru</div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-12 md:p-20 text-center">
            <FloatingPetals count={8} />
            <div className="relative z-10">
              <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">Book Your Custom Piece</div>
              <h2 className="font-display text-4xl md:text-6xl">Turn Memories Into Art.</h2>
              <p className="mt-6 max-w-xl mx-auto text-background/70">
                A boutique commission begins with a conversation. Tell us your story — we'll preserve it in resin and gold.
              </p>
              <Link to="/custom" className="mt-10 inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 rounded-full text-sm tracking-[0.18em] uppercase hover:opacity-90 transition">
                Start Your Commission <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
