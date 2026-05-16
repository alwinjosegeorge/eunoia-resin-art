import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { MemoryDate } from "@/components/site/MemoryDate";
import { FloatingPetals } from "@/components/site/FloatingPetals";
import { Sparkles, Upload, Loader2 } from "lucide-react";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Custom Commissions — Let Us Preserve Your Story | Eunoia" },
      { name: "description", content: "Begin your custom resin art commission. Calculate your piece, share your memory & let Manjima craft your heirloom." },
    ],
  }),
  component: CustomPage,
});

const shapes = [
  { name: "Square", base: 2500 },
  { name: "Round", base: 2800 },
  { name: "Hexagon", base: 3200 },
  { name: "Free-form", base: 3600 },
];
const sizes = [
  { name: "Small (6\")", mult: 1 },
  { name: "Medium (9\")", mult: 1.6 },
  { name: "Large (12\")", mult: 2.4 },
  { name: "XL (15\")", mult: 3.2 },
];
const depthsList = [
  { name: "10mm", add: 0 },
  { name: "15mm", add: 600 },
  { name: "20mm", add: 1200 },
  { name: "30mm", add: 2400 },
];
const addons = [
  { name: "24k Gold Leaf", price: 850 },
  { name: "Premium Teak Frame", price: 1800 },
  { name: "Engraved Personalisation", price: 650 },
  { name: "Velvet Gift Box Upgrade", price: 450 },
  { name: "Express Production (15 days)", price: 1500 },
];

function CustomPage() {
  const [shape, setShape] = useState(shapes[0]);
  const [size, setSize] = useState(sizes[1]);
  const [depth, setDepth] = useState(depthsList[1]);
  const [picked, setPicked] = useState<string[]>(["24k Gold Leaf"]);
  const [story, setStory] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const total =
    Math.round(shape.base * size.mult) +
    depth.add +
    picked.reduce((s, n) => s + (addons.find((a) => a.name === n)?.price ?? 0), 0);

  const togglePick = (n: string) =>
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const generateQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/memory-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story }),
      });
      const data = await res.json();
      setQuote(data.quote || "");
    } catch {
      setQuote("Some flowers never fade, because the memories they hold never die.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <FloatingPetals count={10} />
        <div className="mx-auto max-w-5xl px-6 py-20 text-center relative">
          <ScrollReveal>
            <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-5">The Soul Behind Every Piece</div>
            <h1 className="font-display text-5xl md:text-6xl">Let Us Preserve Your Story.</h1>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
              From bridal bouquets to cherished mementos, we transform your fleeting moments into eternal pieces of art through the medium of liquid glass.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-10">
          {/* Step 1 — Calculator */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="grid place-items-center h-8 w-8 rounded-full bg-gold text-primary-foreground text-sm">1</span>
                <h2 className="font-display text-2xl">Design Your Piece</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs tracking-wide font-medium">Shape</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {shapes.map((s) => (
                      <button key={s.name} onClick={() => setShape(s)} className={`py-2 rounded text-xs transition border ${shape.name === s.name ? "bg-gold text-primary-foreground border-gold" : "border-border hover:border-gold"}`}>{s.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-wide font-medium">Size</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {sizes.map((s) => (
                      <button key={s.name} onClick={() => setSize(s)} className={`py-2 rounded text-xs transition border ${size.name === s.name ? "bg-gold text-primary-foreground border-gold" : "border-border hover:border-gold"}`}>{s.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-wide font-medium">Resin Depth</label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {depthsList.map((d) => (
                      <button key={d.name} onClick={() => setDepth(d)} className={`py-2 rounded text-xs transition border ${depth.name === d.name ? "bg-gold text-primary-foreground border-gold" : "border-border hover:border-gold"}`}>{d.name}</button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs tracking-wide font-medium">Premium Add-ons</label>
                  <div className="mt-2 grid sm:grid-cols-2 gap-2">
                    {addons.map((a) => {
                      const on = picked.includes(a.name);
                      return (
                        <button key={a.name} onClick={() => togglePick(a.name)} className={`flex items-center justify-between p-3 rounded text-xs transition border ${on ? "border-gold bg-gold/5" : "border-border hover:border-gold/60"}`}>
                          <span className="text-left">{a.name}</span>
                          <span className="text-gold">+{formatINR(a.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Step 2 — Upload */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="grid place-items-center h-8 w-8 rounded-full bg-gold text-primary-foreground text-sm">2</span>
                <h2 className="font-display text-2xl">Upload References</h2>
              </div>
              <div className="rounded-xl border-2 border-dashed border-border hover:border-gold transition p-12 text-center bg-blush/20">
                <Upload className="mx-auto h-7 w-7 text-gold mb-3" />
                <div className="text-sm font-medium">Drag and drop or click to browse</div>
                <div className="text-xs text-muted-foreground mt-1">JPG, PNG · up to 10MB</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Step 3 — Memory date */}
          <ScrollReveal><MemoryDate /></ScrollReveal>

          {/* Step 4 — Story Matters */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="grid place-items-center h-8 w-8 rounded-full bg-gold text-primary-foreground text-sm">3</span>
                <h2 className="font-display text-2xl">Your Story Matters</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-5">Tell us the memory behind this artwork. Manjima reads every story personally.</p>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={5}
                placeholder="It was the bouquet from the day we said yes…"
                className="w-full rounded-xl bg-blush/20 border border-border p-4 text-sm focus:outline-none focus:border-gold"
              />
              <button
                onClick={generateQuote}
                disabled={!story.trim() || loading}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs tracking-[0.2em] uppercase disabled:opacity-50 hover:bg-gold transition"
              >
                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                Generate Memory Quote
              </button>
              {quote && (
                <div className="mt-6 p-6 rounded-xl bg-blush/40 border border-gold/30">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Your Memory Quote</div>
                  <p className="font-serif italic text-xl leading-relaxed">"{quote}"</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Sticky calculator */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-7">
              <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Live Estimate</div>
              <h3 className="font-display text-2xl mb-5">Your Commission</h3>
              <ul className="space-y-3 text-sm border-y border-border py-5">
                <li className="flex justify-between"><span className="text-muted-foreground">Shape · {shape.name}</span><span>{formatINR(shape.base)}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Size · {size.name}</span><span>×{size.mult}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Depth · {depth.name}</span><span>+{formatINR(depth.add)}</span></li>
                {picked.map((n) => (
                  <li key={n} className="flex justify-between text-xs text-gold"><span>+ {n}</span><span>{formatINR(addons.find((a) => a.name === n)!.price)}</span></li>
                ))}
              </ul>
              <div className="mt-5 flex justify-between items-baseline">
                <span className="font-display text-xl">Total</span>
                <span className="font-display text-3xl text-gold">{formatINR(total)}</span>
              </div>
              <button className="mt-6 w-full bg-gold text-primary-foreground rounded-full py-4 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition">
                Submit Commission Inquiry
              </button>
              <p className="mt-4 text-[11px] text-muted-foreground text-center">Manjima personally responds within 24 hours.</p>
            </div>
          </ScrollReveal>
        </aside>
      </section>
    </>
  );
}
