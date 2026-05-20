import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import hero from "@/assets/hero-bouquet.jpeg";
import { products as staticProducts, formatINR } from "@/data/products";
import { FloatingPetals } from "@/components/site/FloatingPetals";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TrustStrip } from "@/components/site/TrustStrip";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";

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
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const resData = await res.json();
          const data = resData.success ? resData.data : resData;
          // Filter only active products
          const activeOnly = data.filter((p: any) => {
            const s = p.status?.toLowerCase();
            return s === "active" || s === "featured" || !p.status;
          });
          
          // Map DB products to UI Product shape
          const mapped = activeOnly.map((p: any) => ({
            id: p.id,
            name: p.name,
            tagline: p.subtitle || p.category,
            category: p.category,
            price: Number(p.pricingMatrix?.[0]?.price) || Number(p.previewPrice) || 0,
            image: p.image || staticProducts[0].image,
            hoverImage: p.hoverImage,
            badge: p.badge,
            description: p.description
          }));
          
          setDbProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to load products from database for homepage:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const displayProducts = dbProducts;

  return (
    <>
      {/* HERO + TRUST STRIP (shared petal backdrop) */}
      <div className="relative overflow-hidden">
        <FloatingPetals />

        {/* HERO */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 pt-0 pb-10 grid lg:grid-cols-12 gap-12 items-center relative">
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
                    to="/shop"
                    className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.18em] uppercase hover:bg-gold transition-all"
                  >
                    Explore Collection
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </Link>
                  <a
                    href="https://wa.me/917591947287"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm tracking-[0.18em] uppercase border-b border-gold pb-1 text-foreground hover:text-gold transition"
                  >
                    Chat on WhatsApp
                  </a>
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
      </div>


      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">Curated Series</div>
            <h2 className="font-display text-4xl md:text-5xl">Signature Collections</h2>
            <div className="gold-divider mx-auto w-24 mt-6" />
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="animate-pulse rounded-2xl aspect-[4/5] bg-secondary/50" />
            ))
          ) : displayProducts.length === 0 ? (
            <div className="col-span-full text-center py-10 bg-secondary/10 rounded-2xl border border-border/40 text-muted-foreground text-sm">
              No signature collections added yet.
            </div>
          ) : (
            displayProducts.slice(0, 3).map((p, i) => (
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
            ))
          )}
        </div>
      </section>







      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
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
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="animate-pulse space-y-4">
                <div className="rounded-xl aspect-square bg-secondary/50" />
                <div className="space-y-2 flex flex-col items-center">
                  <div className="h-4 w-28 bg-secondary/70 rounded" />
                  <div className="h-3 w-16 bg-secondary/70 rounded" />
                  <div className="h-2 w-12 bg-secondary/70 rounded" />
                </div>
              </div>
            ))
          ) : displayProducts.length === 0 ? (
            <div className="col-span-full text-center py-10 bg-secondary/10 rounded-2xl border border-border/40 text-muted-foreground text-sm">
              No products available in the gallery.
            </div>
          ) : (
            displayProducts.map((p, i) => (
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
            ))
          )}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="mx-auto max-w-7xl px-6 py-14">
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

      <TestimonialCarousel />


    </>
  );
}
