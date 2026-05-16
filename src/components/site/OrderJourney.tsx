import { Check, ClipboardCheck, Palette, Droplets, Sparkles, Gift, Truck } from "lucide-react";

const steps = [
  { label: "Order Confirmed", icon: ClipboardCheck },
  { label: "Artwork Designing", icon: Palette },
  { label: "Resin Curing", icon: Droplets },
  { label: "Final Polishing", icon: Sparkles },
  { label: "Packed With Love", icon: Gift },
  { label: "Shipped", icon: Truck },
];

export function OrderJourney({ current = 2 }: { current?: number }) {
  return (
    <div className="glass-card rounded-2xl p-7">
      <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Your Order Journey</div>
      <h3 className="font-display text-2xl mb-8">Every step, handcrafted</h3>
      <ol className="grid gap-6 md:grid-cols-6">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={s.label} className="flex md:flex-col items-center gap-3 text-center">
              <div
                className={`grid place-items-center h-12 w-12 rounded-full border transition ${
                  done
                    ? "bg-gold border-gold text-primary-foreground"
                    : active
                    ? "border-gold text-gold shadow-gold animate-pulse"
                    : "border-border text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              <div className="text-[11px] tracking-wide leading-tight">{s.label}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
