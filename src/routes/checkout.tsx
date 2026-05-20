import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { pricingVariants, formatINR } from "@/data/products";
import { Check, ChevronRight, Upload, ShieldCheck, Heart, MapPin, Phone, User, Clock, AlertCircle, Info, Image as ImageIcon, Flower2, Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const steps = ["Memory Method", "Customer Details", "Delivery Address", "Important Notice", "Confirmation"];

function CheckoutPage() {
  const search: any = Route.useSearch();
  const navigate = useNavigate();

  const variantId = search.variantId || "5x5-frame";
  const depth = search.depth || "";
  const initialNotes = search.notes || "";

  const [dbProduct, setDbProduct] = useState<any>(null);

  useEffect(() => {
    if (search.isDbProduct === "true") {
      fetch(`/api/products/${variantId}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setDbProduct(data);
          }
        })
        .catch(err => console.error("Error loading DB product in checkout:", err));
    }
  }, [variantId, search.isDbProduct]);

  const variant = pricingVariants.find((v) => v.id === variantId) || pricingVariants[0];
  
  const productName = dbProduct ? dbProduct.name : variant.name;
  
  const price = dbProduct 
    ? (Number(dbProduct.pricingMatrix?.find((r: any) => r.size === search.size && r.depth === depth)?.price) || Number(dbProduct.pricingMatrix?.[0]?.price) || 0)
    : (search.price ? Number(search.price) : (variant.depths 
        ? variant.depths.find(d => d.size === depth)?.price || 0 
        : variant.basePrice || 0));

  const [step, setStep] = useState(0);

  // Form State
  const [submissionMethod, setSubmissionMethod] = useState<"ship" | "upload" | "">("");
  const [shippingDate, setShippingDate] = useState<Date>();
  const [customNotes, setCustomNotes] = useState(initialNotes);
  const [personalization, setPersonalization] = useState("");
  
  const [customer, setCustomer] = useState({ name: "", mobile: "", whatsapp: "" });
  const [address, setAddress] = useState({ house: "", area: "", landmark: "", district: "", state: "", pin: "" });

  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step === 0) {
      router.history.back();
    } else {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getExpectedCompletionDate = (daysToAdd: number) => {
    let count = 0;
    const currentDate = new Date();
    while (count < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // skip Sunday (0) and Saturday (6)
        count++;
      }
    }
    return currentDate.toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate generation delay
    setTimeout(async () => {
      const orderId = `ERA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const expectedDate = getExpectedCompletionDate(30);
      
      const newOrder = {
        id: orderId,
        customerName: customer.name,
        customerPhone: customer.mobile,
        customerWhatsapp: customer.whatsapp,
        productName: productName,
        depth: depth || "Standard",
        price: price,
        submissionMethod: submissionMethod,
        shippingDate: shippingDate ? format(shippingDate, 'PP') : "",
        notes: customNotes || personalization,
        address: address,
        status: "Order Received",
        expectedCompletionDate: expectedDate,
        createdAt: new Date().toISOString()
      };

      // save to MongoDB
      try {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        });
      } catch (err) {
        console.error("Failed to save order to MongoDB:", err);
      }

      // save to localStorage as a backup
      const existingOrders = JSON.parse(localStorage.getItem("era_orders") || "[]");
      existingOrders.push(newOrder);
      localStorage.setItem("era_orders", JSON.stringify(existingOrders));

      const trackingLink = `https://eunoiaresinart.vercel.app/track/${orderId}`;

      const whatsappMessage = `🌸 *New Eunoia Resin Art Order*

🆔 *Order ID:* ${orderId}

👤 *Customer:* ${customer.name}
📱 *Phone:* ${customer.mobile}

📦 *Product:*
${productName} ${depth ? `(${depth})` : ""}

📝 *Notes:*
${customNotes || personalization || "None"}

🔗 *Track Order:*
${trackingLink}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.location.href = `https://wa.me/917591947287?text=${encodedMessage}`;
      
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pt-4 pb-12">
      <ScrollReveal>
        <div className="text-center mb-10">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Secure Checkout</div>
          <h1 className="font-display text-4xl md:text-5xl">Complete Your Commission</h1>
          <p className="mt-4 italic font-serif text-muted-foreground">“I’m placing a handcrafted memory preservation order.”</p>
        </div>
      </ScrollReveal>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 flex-wrap">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 md:gap-4">
            <button onClick={() => i < step && setStep(i)} className="flex items-center gap-2 group outline-none">
              <span className={`grid place-items-center h-7 w-7 md:h-8 md:w-8 rounded-full text-xs font-medium transition-all duration-300 ${
                i < step ? "bg-gold text-primary-foreground shadow-gold" :
                i === step ? "border-2 border-gold text-gold scale-110" : "border border-border text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden md:block text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors ${i === step ? "text-gold font-semibold" : i < step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            </button>
            {i < steps.length - 1 && <div className={`w-4 md:w-8 h-[1px] ${i < step ? "bg-gold" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <div className="space-y-6">
          
          {/* STEP 1: Memory Submission */}
          {step === 0 && (
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-display text-2xl">How would you like to share your memories?</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setSubmissionMethod("ship")}
                    className={`text-left p-6 rounded-xl border-2 transition-all ${submissionMethod === "ship" ? "border-gold bg-gold/5 shadow-soft" : "border-border hover:border-gold/50"}`}
                  >
                    <Flower2 className={`h-8 w-8 mb-4 ${submissionMethod === "ship" ? "text-gold" : "text-muted-foreground"}`} />
                    <h4 className="font-medium text-lg mb-2">Ship Real Flowers/Bouquet</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Perfect for wedding bouquet preservation and real flower keepsakes.</p>
                  </button>

                  <button 
                    onClick={() => setSubmissionMethod("upload")}
                    className={`text-left p-6 rounded-xl border-2 transition-all ${submissionMethod === "upload" ? "border-gold bg-gold/5 shadow-soft" : "border-border hover:border-gold/50"}`}
                  >
                    <ImageIcon className={`h-8 w-8 mb-4 ${submissionMethod === "upload" ? "text-gold" : "text-muted-foreground"}`} />
                    <h4 className="font-medium text-lg mb-2">Upload Images Only</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Ideal for photo-based resin artworks and custom memory designs.</p>
                  </button>
                </div>

                {submissionMethod === "ship" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                    <div className="p-5 rounded-xl bg-secondary/50 border border-border">
                      <h4 className="font-medium flex items-center gap-2 mb-3"><Info className="h-4 w-4 text-gold" /> Shipping Instruction</h4>
                      <p className="text-sm text-muted-foreground mb-4">Please safely pack and courier your flowers to our studio after placing the order.</p>
                      <div className="bg-background p-4 rounded-lg border border-border text-sm font-mono leading-relaxed">
                        <strong>Manjima (Eunoia Resin Art)</strong><br/>
                        Jayanthi Nivas (H)<br/>
                        Mukkam PO<br/>
                        Calicut – 673602<br/>
                        Phone: +91 7591947287
                      </div>
                      <div className="mt-4 p-3 bg-red-500/10 text-red-600 rounded-lg text-xs font-semibold tracking-wide text-center border border-red-500/20">
                        FRAGILE – DRIED FLOWERS – DO NOT CRUSH
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2 block">Expected Shipping Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className={cn(
                                "w-full flex items-center justify-start text-left font-normal bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none hover:border-gold transition-colors",
                                !shippingDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-3 h-4 w-4 text-gold" />
                              {shippingDate ? format(shippingDate, "MMMM d, yyyy") : <span>Pick a future date</span>}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 border-border shadow-soft" align="start">
                            <Calendar
                              mode="single"
                              selected={shippingDate}
                              onSelect={setShippingDate}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                              className="rounded-xl"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Special Instructions / Notes</label>
                        <textarea value={customNotes} onChange={(e) => setCustomNotes(e.target.value)} rows={3} className="mt-2 w-full bg-secondary/30 border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-gold transition-colors" placeholder="e.g. 'Use gold accents', 'Minimal design', 'Add names and date'" />
                      </div>
                    </div>
                  </div>
                )}

                {submissionMethod === "upload" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="rounded-xl border-2 border-dashed border-border hover:border-gold p-6 text-center transition cursor-pointer bg-secondary/20">
                        <Upload className="mx-auto h-6 w-6 text-gold mb-2" />
                        <div className="text-xs font-medium">Upload Memory Photos</div>
                      </div>
                      <div className="rounded-xl border-2 border-dashed border-border hover:border-gold p-6 text-center transition cursor-pointer bg-secondary/20">
                        <Upload className="mx-auto h-6 w-6 text-gold mb-2" />
                        <div className="text-xs font-medium">Upload Reference Images</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Names / Date / Quote</label>
                        <input value={personalization} onChange={(e) => setPersonalization(e.target.value)} className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors" placeholder="e.g. Arun ❤️ Sarangi, 30/11/2025" />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Special Instructions / Notes</label>
                        <textarea value={customNotes} onChange={(e) => setCustomNotes(e.target.value)} rows={3} className="mt-2 w-full bg-secondary/30 border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Any specific design requests..." />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* STEP 2: Customer Details */}
          {step === 1 && (
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-display text-2xl flex items-center gap-3"><User className="h-6 w-6 text-gold" /> Customer Details</h3>
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Full Name</label>
                    <input value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} className="mt-2 w-full bg-transparent border-b border-border py-3 text-base focus:border-gold outline-none transition-colors" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Mobile Number</label>
                    <input value={customer.mobile} onChange={(e) => setCustomer({...customer, mobile: e.target.value})} type="tel" className="mt-2 w-full bg-transparent border-b border-border py-3 text-base focus:border-gold outline-none transition-colors" placeholder="+91" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">WhatsApp Number (Optional)</label>
                    <input value={customer.whatsapp} onChange={(e) => setCustomer({...customer, whatsapp: e.target.value})} type="tel" className="mt-2 w-full bg-transparent border-b border-border py-3 text-base focus:border-gold outline-none transition-colors" placeholder="If different from mobile" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* STEP 3: Delivery Address */}
          {step === 2 && (
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-display text-2xl flex items-center gap-3"><MapPin className="h-6 w-6 text-gold" /> Delivery Address</h3>
                <div className="grid sm:grid-cols-2 gap-x-5 gap-y-6">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">House Name / Flat</label>
                    <input value={address.house} onChange={(e) => setAddress({...address, house: e.target.value})} className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors" placeholder="e.g. Rose Villa, Apt 4B" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Area / Street</label>
                    <input value={address.area} onChange={(e) => setAddress({...address, area: e.target.value})} className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors" placeholder="Street name, neighborhood" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Landmark</label>
                    <input value={address.landmark} onChange={(e) => setAddress({...address, landmark: e.target.value})} className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors" placeholder="Near post office" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">District / City</label>
                    <input value={address.district} onChange={(e) => setAddress({...address, district: e.target.value})} className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors" placeholder="District" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">State</label>
                    <input value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors" placeholder="State" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">PIN Code</label>
                    <input value={address.pin} onChange={(e) => setAddress({...address, pin: e.target.value})} className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors" placeholder="6 digits" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* STEP 4: Important Notice */}
          {step === 3 && (
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-display text-2xl flex items-center gap-3"><AlertCircle className="h-6 w-6 text-gold" /> Important Notice</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl border border-border bg-secondary/30 flex flex-col items-center text-center gap-3 hover:border-gold/50 transition">
                    <Clock className="h-6 w-6 text-gold" />
                    <h4 className="font-medium text-sm">Production Time</h4>
                    <p className="text-xs text-muted-foreground">30–35 Working Days<br/>(Saturdays & Sundays excluded)</p>
                  </div>
                  <div className="p-5 rounded-xl border border-border bg-secondary/30 flex flex-col items-center text-center gap-3 hover:border-gold/50 transition">
                    <ShieldCheck className="h-6 w-6 text-gold" />
                    <h4 className="font-medium text-sm">Payment Notice</h4>
                    <p className="text-xs text-muted-foreground text-red-500 font-medium">100% Full Payment Required For Booking</p>
                  </div>
                  <div className="p-5 rounded-xl border border-border bg-secondary/30 flex flex-col items-center text-center gap-3 hover:border-gold/50 transition">
                    <MapPin className="h-6 w-6 text-gold" />
                    <h4 className="font-medium text-sm">Shipping Included</h4>
                    <p className="text-xs text-muted-foreground">Shipping charges included in all prices.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-border bg-secondary/30 flex flex-col items-center text-center gap-3 hover:border-gold/50 transition">
                    <Heart className="h-6 w-6 text-gold" />
                    <h4 className="font-medium text-sm">Handmade Notice</h4>
                    <p className="text-xs text-muted-foreground">Every piece is handcrafted specially for you. No two creations are exactly the same.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Nav Buttons */}
          {step < 4 && (
            <div className="flex justify-between items-center pt-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-secondary hover:border-gold transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={step === 0 && !submissionMethod}
                className="px-8 py-3 bg-gold text-primary-foreground rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase hover:opacity-90 hover:scale-[1.02] shadow-gold transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                Continue →
              </button>
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
