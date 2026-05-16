import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { products, formatINR } from "@/data/products";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Heart, ShieldCheck, Truck, Upload } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
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

const depths = ["10mm", "15mm", "20mm", "30mm"] as const;
const shapes = ["Square", "Round", "Hexagon", "Free-form"] as const;
const flowers = [
  { name: "Roses", color: "#f4b6c2" },
  { name: "Hydrangeas", color: "#b6a8f4" },
  { name: "Lavender", color: "#9b7fc7" },
  { name: "Daisies", color: "#fff9d1" },
  { name: "Marigold", color: "#f4c66b" },
];
const frames = [
  { name: "Teak", color: "#8b5a2b" },
  { name: "Pine", color: "#d6b48e" },
  { name: "Black Oak", color: "#2a1a10" },
  { name: "Brass", color: "#c9a14a" },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [depth, setDepth] = useState<typeof depths[number]>("15mm");
  const [shape, setShape] = useState<typeof shapes[number]>("Square");
  const [flower, setFlower] = useState(flowers[0]);
  const [frame, setFrame] = useState(frames[0]);

  const shapeStyle: Record<string, string> = {
    Square: "rounded-lg",
    Round: "rounded-full",
    Hexagon: "[clip-path:polygon(25%_5%,75%_5%,98%_50%,75%_95%,25%_95%,2%_50%)]",
    "Free-form": "rounded-[40%_60%_55%_45%/55%_45%_55%_45%]",
  };

  const depthScale: Record<string, number> = { "10mm": 0.85, "15mm": 1, "20mm": 1.12, "30mm": 1.28 };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-2 gap-16">
      {/* LIVE PREVIEW */}
      <ScrollReveal>
        <div className="sticky top-28">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Live Customization Preview</div>
          <div
            className="relative aspect-square w-full shadow-soft overflow-hidden grid place-items-center transition-all duration-700"
            style={{
              background: `linear-gradient(135deg, ${frame.color}40, ${frame.color}80)`,
              borderRadius: shape === "Round" ? "50%" : "1rem",
            }}
          >
            <div className="absolute inset-6 rounded-[inherit] border-[10px]" style={{ borderColor: frame.color, background: "linear-gradient(180deg, #fefaf2, #f8efdf)" }} />
            <div
              className={`relative ${shapeStyle[shape]} overflow-hidden`}
              style={{
                width: `${65 * depthScale[depth]}%`,
                height: `${65 * depthScale[depth]}%`,
                background: `radial-gradient(circle at 30% 30%, ${flower.color}90, ${flower.color}40 70%, transparent), linear-gradient(135deg, rgba(255,255,255,0.6), rgba(201,161,74,0.3))`,
                boxShadow: `inset 0 0 60px ${flower.color}55, 0 10px 40px rgba(0,0,0,0.15)`,
              }}
            >
              {/* simulated petals */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="absolute rounded-full" style={{
                  width: 28, height: 28,
                  left: `${20 + (i * 13) % 60}%`, top: `${15 + (i * 17) % 60}%`,
                  background: `radial-gradient(circle, ${flower.color}, ${flower.color}00)`,
                  filter: "blur(1px)",
                }} />
              ))}
              {/* gold flake */}
              <div className="absolute inset-0 mix-blend-overlay" style={{
                background: "radial-gradient(circle at 70% 70%, oklch(0.85 0.12 80) 0px, transparent 4px), radial-gradient(circle at 30% 80%, oklch(0.78 0.13 75) 0px, transparent 3px), radial-gradient(circle at 60% 30%, oklch(0.85 0.12 80) 0px, transparent 5px)",
              }} />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground italic">Preview updates live as you customise</p>
        </div>
      </ScrollReveal>

      {/* DETAILS */}
      <ScrollReveal delay={120}>
        <div>
          <div className="text-[10px] tracking-[0.35em] uppercase text-gold">{product.category}</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <div className="text-2xl text-foreground font-medium">{formatINR(product.price)}</div>
            <div className="text-sm line-through text-muted-foreground">{formatINR(Math.round(product.price * 1.25))}</div>
            <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded">20% off</span>
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Depth */}
          <div className="mt-8">
            <div className="flex justify-between text-xs"><span className="tracking-wide font-medium">Resin Depth</span><span className="text-gold">{depth} {depth === "15mm" && "(Standard)"}</span></div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {depths.map((d) => (
                <button key={d} onClick={() => setDepth(d)} className={`py-2 rounded text-xs transition border ${depth === d ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground hover:border-gold"}`}>{d}</button>
              ))}
            </div>
          </div>

          {/* Shape */}
          <div className="mt-6">
            <div className="text-xs tracking-wide font-medium">Shape</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {shapes.map((s) => (
                <button key={s} onClick={() => setShape(s)} className={`px-4 py-2 rounded-full text-xs transition border ${shape === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-gold"}`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Flower */}
          <div className="mt-6">
            <div className="text-xs tracking-wide font-medium">Flower Palette</div>
            <div className="mt-3 flex flex-wrap gap-3">
              {flowers.map((f) => (
                <button key={f.name} onClick={() => setFlower(f)} title={f.name} className={`grid place-items-center transition ${flower.name === f.name ? "ring-2 ring-offset-2 ring-gold" : ""} h-10 w-10 rounded-full`} style={{ background: f.color }}>
                  <span className="sr-only">{f.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Selected: {flower.name}</div>
          </div>

          {/* Frame */}
          <div className="mt-6">
            <div className="text-xs tracking-wide font-medium">Frame Material</div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {frames.map((f) => (
                <button key={f.name} onClick={() => setFrame(f)} className={`py-3 rounded flex flex-col items-center gap-1.5 transition border ${frame.name === f.name ? "border-gold" : "border-border hover:border-gold/60"}`}>
                  <span className="h-5 w-5 rounded" style={{ background: f.color }} />
                  <span className="text-[10px]">{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Uploads */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button className="rounded-xl border-2 border-dashed border-border hover:border-gold py-8 grid place-items-center gap-2 transition">
              <Upload className="h-5 w-5 text-gold" />
              <span className="text-xs">Upload Your Memories</span>
            </button>
            <button className="rounded-xl border-2 border-dashed border-border hover:border-gold py-8 grid place-items-center gap-2 transition">
              <span className="text-gold">✦</span>
              <span className="text-xs">Flower Reference</span>
            </button>
          </div>

          {/* Notes */}
          <div className="mt-5">
            <label className="text-xs tracking-wide font-medium">Custom Notes for Manjima</label>
            <textarea
              className="mt-2 w-full rounded-xl bg-blush/30 border border-border p-4 text-sm focus:outline-none focus:border-gold"
              rows={3}
              placeholder="Tell us the story behind these flowers…"
            />
          </div>

          <Link to="/checkout" className="mt-8 flex items-center justify-center gap-3 bg-gold text-primary-foreground rounded-full py-4 text-sm tracking-[0.25em] uppercase hover:opacity-90 transition">
            <Heart className="h-4 w-4" /> Add to Collection
          </Link>

          <div className="mt-5 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> Handmade with Love</span>
            <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-gold" /> Estimated: 12–15 days</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
