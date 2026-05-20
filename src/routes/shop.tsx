import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { products, formatINR } from "@/data/products";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Our Handcrafted Collections | Eunoia Resin Art" },
      { name: "description", content: "Discover handcrafted resin art pieces. Teak frames, hexagon deepcasts, hoops, coasters & more — each a soulful heirloom." },
    ],
  }),
  component: ShopPage,
});

const cats = ["All Pieces", "Teak Wood Frames", "Hoop Collection", "Hexagon Deepcast", "Coasters", "Trays"];

function ShopPage() {
  const [cat, setCat] = useState("All Pieces");
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
          
          // Map DB pricing matrix/schema properties if needed to conform to the UI's simple Product type
          const mapped = activeOnly.map((p: any) => ({
            id: p.id,
            name: p.name,
            tagline: p.subtitle || p.category,
            category: p.category,
            price: Number(p.pricingMatrix?.[0]?.price) || Number(p.previewPrice) || 0,
            image: p.image || products[0].image, // Fallback image if not uploaded yet
            hoverImage: p.hoverImage, // Map hoverImage
            badge: p.badge,
            description: p.description
          }));
          
          setDbProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to load products from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const displayProducts = dbProducts.length > 0 ? dbProducts : products;

  const list = useMemo(() => (cat === "All Pieces" ? displayProducts : displayProducts.filter((p) => p.category === cat)), [cat, displayProducts]);
  return (
    <div className="mx-auto max-w-7xl px-6 pt-8 pb-20">
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">Curated Atelier</div>
          <h1 className="font-display text-5xl md:text-6xl">Our Handcrafted Collections</h1>
          <p className="mt-6 text-muted-foreground">
            Discover the ethereal beauty of liquid art preserved in wood. Each piece is a soulful journey of raw materials meeting refined craftsmanship.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-[260px_1fr] gap-12">
        <aside className="space-y-8">
          <ScrollReveal>
            <h3 className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4 border-b border-border pb-3">Categories</h3>
            <ul className="space-y-3">
              {cats.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCat(c)}
                    className={`text-sm transition ${cat === c ? "text-gold font-medium" : "text-foreground/70 hover:text-gold"}`}
                  >
                    {cat === c && "• "}{c}
                  </button>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="glass-card rounded-xl p-5">
              <Sparkles className="h-5 w-5 text-gold" />
              <h4 className="font-display text-xl mt-3">Bespoke Art</h4>
              <p className="text-xs text-muted-foreground mt-2">
                Want something uniquely yours? Start your custom commission.
              </p>
              <Link to="/custom" className="mt-4 block text-center border border-gold text-gold rounded-full px-4 py-2 text-[11px] tracking-[0.25em] uppercase hover:bg-gold hover:text-primary-foreground transition">
                Request Custom
              </Link>
            </div>
          </ScrollReveal>
        </aside>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 80}>
              <Link to="/product/$id" params={{ id: p.id }} className="block group hover-lift">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-secondary">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  {p.hoverImage && (
                    <img 
                      src={p.hoverImage} 
                      alt={`${p.name} Alternate`} 
                      loading="lazy" 
                      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" 
                    />
                  )}
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-foreground text-background text-[9px] tracking-[0.25em] uppercase px-2 py-1 rounded z-10">{p.badge}</span>
                  )}
                  <button className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-white/80 backdrop-blur hover:text-gold transition z-10">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">{p.category}</div>
                  <div className="font-display text-lg mt-1">{p.name}</div>
                  <div className="text-gold text-sm mt-1">{formatINR(p.price)}</div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
