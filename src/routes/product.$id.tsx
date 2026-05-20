import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { products, formatINR, pricingVariants } from "@/data/products";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Heart, ShieldCheck, Truck, Clock, Package, ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }) => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      if (res.ok) {
        const product = await res.json();
        if (product) return { product };
      }
    } catch (err) {
      console.error("Failed to load product from API, falling back to static:", err);
    }
    
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — Eunoia Resin Art` },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="text-center py-32"><h1 className="font-display text-3xl">Piece not found</h1><Link to="/shop" className="text-gold mt-4 inline-block">Back to shop</Link></div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  
  const isDbProduct = !!product.pricingMatrix && product.pricingMatrix.length > 0;

  const [selectedVariantId, setSelectedVariantId] = useState(isDbProduct ? "" : pricingVariants[0].id);
  const [selectedDepth, setSelectedDepth] = useState(isDbProduct ? "" : "15mm");
  
  const [selectedDbSize, setSelectedDbSize] = useState(isDbProduct ? (product.selectedSizes?.[0] || "") : "");
  const [selectedDbDepth, setSelectedDbDepth] = useState(isDbProduct ? (product.selectedDepths?.[0] || "") : "");
  
  const [notes, setNotes] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (isDbProduct) {
      setSelectedDbSize(product.selectedSizes?.[0] || "");
      setSelectedDbDepth(product.selectedDepths?.[0] || "");
    } else {
      setSelectedVariantId(pricingVariants[0].id);
      setSelectedDepth("15mm");
    }
    setActiveImage(0);
  }, [product, isDbProduct]);

  const gallery = product.gallery && product.gallery.length > 0 
    ? [product.image, ...product.gallery].filter(Boolean) as string[]
    : [product.image, product.image, product.image].filter(Boolean) as string[];
  
  let currentPrice = 0;
  if (isDbProduct) {
    const matchedRow = product.pricingMatrix?.find(
      (r: any) => r.size === selectedDbSize && r.depth === selectedDbDepth
    );
    currentPrice = Number(matchedRow?.price) || Number(product.pricingMatrix?.[0]?.price) || 0;
  } else {
    const selectedVariant = pricingVariants.find(v => v.id === selectedVariantId);
    currentPrice = selectedVariant?.depths 
      ? selectedVariant.depths.find(d => d.size === selectedDepth)?.price || selectedVariant.depths[0].price || 0 
      : selectedVariant?.basePrice || 0;
  }

  const handleVariantChange = (id: string) => {
    setSelectedVariantId(id);
  };

  const handleBookNow = () => {
    navigate({
      to: "/checkout",
      search: {
        variantId: isDbProduct ? product.id : selectedVariantId,
        depth: isDbProduct ? selectedDbDepth : selectedDepth,
        notes: notes,
        ...(isDbProduct ? { size: selectedDbSize, isDbProduct: "true" } : {})
      } as any
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-4 pb-12">
      {/* Breadcrumbs and Back Navigation */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors duration-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
        </Link>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gold font-medium truncate max-w-[120px] md:max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* IMAGE GALLERY */}
        <ScrollReveal>
          <div className="sticky top-28 space-y-4">
            <div className="aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden bg-secondary">
              <img src={gallery[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {gallery.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${activeImage === idx ? "border-gold" : "border-transparent hover:border-gold/50"}`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* DETAILS */}
        <ScrollReveal delay={120}>
        <div>
          <div className="text-[10px] tracking-[0.35em] uppercase text-gold">{product.category}</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <div className="text-3xl text-foreground font-medium">{formatINR(currentPrice)}</div>
            <div className="text-sm line-through text-muted-foreground">{formatINR(Math.round(currentPrice * 1.25))}</div>
            <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded">20% off</span>
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Art Piece Variation */}
          {/* Frame Size */}
          {(isDbProduct ? (product.selectedSizes?.length > 0) : true) && (
            <div className="mt-8">
              <div className="flex justify-between text-xs">
                <span className="tracking-wide font-medium">Frame Size</span>
                <span className="text-gold">
                  {isDbProduct ? selectedDbSize : (
                    <>
                      {selectedVariantId === "5x5-frame" && "5×5 Frame"}
                      {selectedVariantId === "6x6-teak" && "6×6 Frame"}
                      {selectedVariantId === "9x12-teak" && "9×12 Frame"}
                      {selectedVariantId === "12x16" && "12×16 Frame"}
                    </>
                  )}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {isDbProduct ? (
                  product.selectedSizes.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => setSelectedDbSize(s)}
                      className={`py-2 rounded text-xs transition border ${selectedDbSize === s ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`}
                    >
                      {s}
                    </button>
                  ))
                ) : (
                  [
                    { id: "5x5-frame", label: "5×5 Frame" },
                    { id: "6x6-teak", label: "6×6 Frame" },
                    { id: "9x12-teak", label: "9×12 Frame" },
                    { id: "12x16", label: "12×16 Frame" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedVariantId(f.id)}
                      className={`py-2 rounded text-xs transition border ${selectedVariantId === f.id ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`}
                    >
                      {f.label}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Resin Depth */}
          {(isDbProduct ? (product.selectedDepths?.length > 0) : true) && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between text-xs">
                <span className="tracking-wide font-medium">Resin Depth</span>
                <span className="text-gold">{isDbProduct ? selectedDbDepth : selectedDepth}</span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {isDbProduct ? (
                  product.selectedDepths.map((d: string) => (
                    <button 
                      key={d} 
                      onClick={() => setSelectedDbDepth(d)} 
                      className={`py-2 rounded text-xs transition border ${selectedDbDepth === d ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`}
                    >
                      {d}
                    </button>
                  ))
                ) : (
                  ["10mm", "15mm", "20mm", "30mm"].map((d) => (
                    <button 
                      key={d} 
                      onClick={() => setSelectedDepth(d)} 
                      className={`py-2 rounded text-xs transition border ${selectedDepth === d ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`}
                    >
                      {d}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Trust / Process Cards */}
          <div className="mt-8 grid grid-cols-1 gap-3">
            {(!isDbProduct || product.showProductionTime !== false) && (
              <div className="glass-card rounded-xl border border-border p-4 flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Production Time</p>
                  <p className="text-xs text-muted-foreground mt-0.5">30–35 working days<br />(Saturdays &amp; Sundays excluded)</p>
                </div>
              </div>
            )}
            {(!isDbProduct || product.showPayment !== false) && (
              <div className="glass-card rounded-xl border border-border p-4 flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Payment Process</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Payment will be collected after your flowers safely reach our studio.</p>
                </div>
              </div>
            )}
            {(!isDbProduct || product.showShipping !== false) && (
              <div className="glass-card rounded-xl border border-border p-4 flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <Package className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Shipping Included</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Shipping charges included in all prices.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-3">
            <button 
              onClick={handleBookNow} 
              className="w-full flex items-center justify-center gap-3 bg-gold text-primary-foreground rounded-full py-4 text-sm tracking-[0.25em] uppercase hover:opacity-90 hover:scale-[1.01] transition-all shadow-gold"
            >
              <Heart className="h-4 w-4" /> Book Now
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-border bg-transparent text-foreground rounded-full py-4 text-sm tracking-[0.25em] uppercase hover:bg-secondary transition">
              Add to Cart
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-[11px] tracking-wide text-muted-foreground uppercase">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> Handmade with Love</span>
            <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-gold" /> Ships securely</span>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
