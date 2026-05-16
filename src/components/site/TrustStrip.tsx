import { Heart, Truck, Shield, Sparkles, Gem, Infinity as InfinityIcon } from "lucide-react";

const items = [
  { icon: Heart, label: "Handmade with care" },
  { icon: Truck, label: "Shipping included" },
  { icon: Shield, label: "Safe fragile packaging" },
  { icon: Sparkles, label: "Fully customised" },
  { icon: Gem, label: "Premium resin quality" },
  { icon: InfinityIcon, label: "Long-lasting preservation" },
];

export function TrustStrip() {
  const loop = [...items, ...items];
  return (
    <div className="border-y border-border/60 bg-secondary/40 overflow-hidden">
      <div className="marquee-track flex gap-14 py-5 whitespace-nowrap">
        {loop.map((it, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-foreground/70">
            <it.icon className="h-4 w-4 text-gold" />
            <span className="tracking-wide">{it.label}</span>
            <span className="text-gold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
