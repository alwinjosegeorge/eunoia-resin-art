import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { products, formatINR } from "@/data/products";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Heart, Sparkles, Package, Search } from "lucide-react";

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

  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    return "";
  });

  // Sync search state with URL query parameter changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleUrlChange = () => {
        const params = new URLSearchParams(window.location.search);
        const urlQuery = params.get("q") || params.get("search") || "";
        if (urlQuery !== searchQuery) {
          setSearchQuery(urlQuery);
        }
      };

      // Poll slightly or listen to custom history changes, but since TanStack router changes URL,
      // a simple interval or popstate listener works perfectly. Let's use a popstate listener
      // and a simple interval for robust reactivity during navigation events.
      window.addEventListener("popstate", handleUrlChange);
      const interval = setInterval(handleUrlChange, 200);

      return () => {
        window.removeEventListener("popstate", handleUrlChange);
        clearInterval(interval);
      };
    }
  }, [searchQuery]);

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

  const displayProducts = dbProducts;

  const list = useMemo(() => {
    let filtered = displayProducts;
    if (cat !== "All Pieces") {
      filtered = filtered.filter((p) => p.category === cat);
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [cat, searchQuery, displayProducts]);

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
        <aside className="space-y-8 animate-in fade-in duration-500">
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

        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Main content header with Search and info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-secondary/10 border border-border/40 rounded-2xl p-4">
            <div className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{list.length}</span> pieces in <span className="font-semibold text-gold">{cat}</span>
            </div>
            
            {/* Search Input Box */}
            <div className="relative flex items-center bg-background border border-border/60 rounded-full px-4 py-2 w-full sm:max-w-xs shadow-sm hover:border-gold/45 focus-within:border-gold transition">
              <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // Update URL parameter
                  if (typeof window !== "undefined") {
                    const url = new URL(window.location.href);
                    if (e.target.value) {
                      url.searchParams.set("q", e.target.value);
                    } else {
                      url.searchParams.delete("q");
                    }
                    window.history.replaceState({}, "", url.toString());
                  }
                }}
                className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 w-full outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    if (typeof window !== "undefined") {
                      const url = new URL(window.location.href);
                      url.searchParams.delete("q");
                      window.history.replaceState({}, "", url.toString());
                    }
                  }}
                  className="text-[10px] text-muted-foreground hover:text-foreground font-semibold ml-1.5 shrink-0"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="animate-pulse space-y-4">
                  <div className="rounded-xl aspect-[4/5] bg-secondary/50" />
                  <div className="space-y-2 flex flex-col items-center">
                    <div className="h-2.5 w-12 bg-secondary/70 rounded" />
                    <div className="h-4 w-28 bg-secondary/70 rounded" />
                    <div className="h-3 w-16 bg-secondary/70 rounded" />
                  </div>
                </div>
              ))
            ) : list.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-secondary/10 rounded-2xl border border-border/40">
                <Package className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">No pieces found matching your criteria.</p>
              </div>
            ) : (
              list.map((p, i) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
