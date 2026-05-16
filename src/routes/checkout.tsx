import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { OrderJourney } from "@/components/site/OrderJourney";
import { products, formatINR } from "@/data/products";
import { Check, ChevronRight, Upload, Trash2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Review Your Order | Eunoia Resin Art" },
      { name: "description", content: "Complete your luxury commission. Multi-step checkout for handcrafted resin heirlooms." },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Product", "Upload Memories", "Personalisation", "Payment"];

function CheckoutPage() {
  const [step, setStep] = useState(0);
  const cart = [
    { ...products[1], qty: 1 },
    { ...products[4], qty: 1 },
  ];
  const subtotal = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const shipping = 0;
  const handling = 450;
  const total = subtotal + shipping + handling;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <ScrollReveal>
        <div className="text-center mb-10">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Final Step</div>
          <h1 className="font-display text-5xl">Review Your Order</h1>
          <p className="mt-4 italic font-serif text-muted-foreground">Capturing the ephemeral in timeless resin. Thank you for choosing a handcrafted soul piece.</p>
        </div>
      </ScrollReveal>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className="flex items-center gap-2"
          >
            <span className={`grid place-items-center h-8 w-8 rounded-full text-xs transition ${
              i < step ? "bg-gold text-primary-foreground" :
              i === step ? "border-2 border-gold text-gold" : "border border-border text-muted-foreground"
            }`}>{i < step ? <Check className="h-4 w-4" /> : i + 1}</span>
            <span className={`text-xs tracking-[0.2em] uppercase ${i === step ? "text-gold" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground mx-2" />}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-8">
          {step === 0 && (
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-7">
                <h3 className="font-display text-2xl mb-6">Your Gallery <span className="text-sm text-muted-foreground ml-3">{cart.length} pieces</span></h3>
                <ul className="divide-y divide-border">
                  {cart.map((p) => (
                    <li key={p.id} className="py-5 flex gap-5">
                      <img src={p.image} alt={p.name} className="h-24 w-24 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="font-display text-lg">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.tagline}</div>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="inline-flex items-center border border-border rounded-full overflow-hidden">
                            <button className="px-3 py-1 hover:bg-secondary">−</button>
                            <span className="px-3 text-sm">{p.qty}</span>
                            <button className="px-3 py-1 hover:bg-secondary">+</button>
                          </div>
                          <button className="text-xs text-destructive flex items-center gap-1 hover:underline"><Trash2 className="h-3 w-3" /> Remove</button>
                        </div>
                      </div>
                      <div className="text-right text-gold">{formatINR(p.price)}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

          {step === 1 && (
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-7">
                <h3 className="font-display text-2xl mb-6">Upload Your Memories</h3>
                <div className="rounded-xl border-2 border-dashed border-border hover:border-gold transition p-12 text-center bg-blush/20">
                  <Upload className="mx-auto h-7 w-7 text-gold mb-3" />
                  <div className="text-sm font-medium">Drag your photos here</div>
                  <div className="text-xs text-muted-foreground mt-1">Wedding day photos, flower references, anything that tells your story.</div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {step === 2 && (
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-7 space-y-5">
                <h3 className="font-display text-2xl">Personalisation</h3>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Engraving Text</label>
                  <input className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="e.g. A & T — 12.06.24" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Your Story</label>
                  <textarea rows={5} className="mt-2 w-full bg-blush/20 border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-gold" placeholder="Tell us the memory behind this artwork…" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Memorable Date</label>
                  <input type="date" className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" />
                </div>
              </div>
            </ScrollReveal>
          )}

          {step === 3 && (
            <ScrollReveal>
              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="font-display text-2xl mb-5">Shipping Information</h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2"><label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Full Name</label><input className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="Aditi Sharma" /></div>
                    <div><label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Phone</label><input className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="+91 00000 00000" /></div>
                    <div><label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Email</label><input type="email" className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="hello@example.com" /></div>
                    <div className="sm:col-span-2"><label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Street Address</label><input className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="Apartment, suite, unit" /></div>
                    <div><label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">City</label><input className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="Mumbai" /></div>
                    <div><label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Pincode</label><input className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="400001" /></div>
                  </div>
                </div>
                <OrderJourney current={0} />
              </div>
            </ScrollReveal>
          )}

          <div className="flex justify-between">
            <button
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="px-6 py-3 border border-border rounded-full text-xs tracking-[0.2em] uppercase disabled:opacity-30"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="px-8 py-3 bg-foreground text-background rounded-full text-xs tracking-[0.2em] uppercase hover:bg-gold transition"
            >
              {step === steps.length - 1 ? "Place Order →" : "Continue →"}
            </button>
          </div>
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-7">
              <h3 className="font-display text-2xl mb-6">Order Summary</h3>
              <ul className="space-y-3 text-sm border-b border-border pb-5">
                <li className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Standard Shipping</span><span className="text-gold">Complimentary</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Fragile Handling</span><span>{formatINR(handling)}</span></li>
              </ul>
              <div className="mt-5 flex items-baseline justify-between">
                <span className="font-display text-xl">Total</span>
                <span className="font-display text-3xl text-gold">{formatINR(total)}</span>
              </div>
              <div className="mt-5 p-4 rounded-xl bg-blush/40 border border-gold/30 text-xs">
                <div className="flex items-center gap-2 font-medium text-foreground"><ShieldCheck className="h-4 w-4 text-gold" /> Fragile · Dried Flowers</div>
                <p className="mt-1 text-muted-foreground">Signature silk-lined packaging protects delicate botanicals.</p>
              </div>
              <Link to="/checkout" className="mt-6 block text-center bg-gold text-primary-foreground rounded-full py-3.5 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition">
                Secure Payment · Pay {formatINR(total)}
              </Link>
              <p className="mt-3 text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground">UPI · Cards · Net Banking</p>
            </div>
          </ScrollReveal>
        </aside>
      </div>
    </div>
  );
}
