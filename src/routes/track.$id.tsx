import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CheckCircle2, Circle, Clock, Package, Truck, ArrowLeft, Droplets, Paintbrush, Sparkles } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";

const getOrderFromServer = createServerFn({ method: "GET" })
  .handler(async ({ data: id }) => {
    try {
      const { connectToDatabase } = await import("@/lib/db");
      const { Order } = await import("@/models/Order");

      await connectToDatabase();
      const order = await Order.findOne({ id }).lean();
      if (order) {
        const plainOrder = JSON.parse(JSON.stringify(order));
        return { success: true, data: plainOrder };
      }
      return { success: false, error: "Order not found" };
    } catch (err: any) {
      console.error("Error in getOrderFromServer:", err);
      return { success: false, error: err.message || "Failed to fetch order" };
    }
  });

export const Route = createFileRoute("/track/$id")({
  loader: async ({ params }) => {
    try {
      const res = await getOrderFromServer({ data: params.id });
      if (res && res.success && res.data) {
        return { order: res.data };
      }
    } catch (err) {
      console.error("Failed to load tracking order from server function:", err);
    }
    return { order: null };
  },
  component: TrackOrderPage,
});

const ALL_STAGES = [
  "Order Received",
  "Waiting For Material", // dynamic
  "Flowers Received",
  "Design Planning",
  "Resin Casting",
  "Drying Process",
  "Finishing & Polishing",
  "Ready For Dispatch",
  "Shipped",
  "Delivered"
];

function TrackOrderPage() {
  const { id } = Route.useParams();
  const { order: initialOrder } = Route.useLoaderData();
  const [order, setOrder] = useState<any>(initialOrder);
  const [loading, setLoading] = useState(!initialOrder);

  useEffect(() => {
    if (initialOrder) {
      setOrder(initialOrder);
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${id}`);
        if (res.ok) {
          const resData = await res.json();
          const data = resData.success ? resData.data : resData;
          setOrder(data);
        } else {
          // Fallback to localStorage
          const savedOrders = JSON.parse(localStorage.getItem("era_orders") || "[]");
          const foundOrder = savedOrders.find((o: any) => o.id === id);
          if (foundOrder) {
            setOrder(foundOrder);
          }
        }
      } catch (err) {
        console.error("Error fetching order tracking data:", err);
        // Fallback
        const savedOrders = JSON.parse(localStorage.getItem("era_orders") || "[]");
        const foundOrder = savedOrders.find((o: any) => o.id === id);
        if (foundOrder) {
          setOrder(foundOrder);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id, initialOrder]);

  if (loading) {
    return <div className="min-h-[60vh] grid place-items-center"><div className="animate-pulse text-gold tracking-widest text-sm uppercase">Loading Tracking Data...</div></div>;
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <Package className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h1 className="font-display text-3xl mb-2">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find an order with ID: <span className="font-mono text-foreground">{id}</span></p>
        <Link to="/" className="px-6 py-3 border border-border rounded-full text-xs uppercase tracking-widest hover:border-gold transition">Return Home</Link>
      </div>
    );
  }

  // Determine dynamic stage 2 name
  const isUpload = order.submissionMethod === "upload";
  const stage2Name = isUpload ? "Waiting For Images" : "Waiting For Flowers";
  
  const isKitOrder = order.preBookingKit === true;
  const stages = isKitOrder ? [
    "Order Received",
    "Kit Packed",
    "Kit Shipped",
    "Kit Delivered",
    "Flowers Prepared",
    "Flowers Shipped",
    "Flowers Received",
    "Design Planning",
    "Resin Casting",
    "Drying Process",
    "Finishing & Polishing",
    "Ready For Dispatch",
    "Delivered"
  ] : [...ALL_STAGES];

  if (!isKitOrder) {
    stages[1] = stage2Name;
    // If upload method, also rename stage[2] from "Flowers Received" to "Images Received"
    if (isUpload) {
      stages[2] = "Images Received";
    }
  }

  // Determine current active stage index based on status and kit status
  let activeIndex = 0;
  if (isKitOrder) {
    const statusLower = (order.status || "").toLowerCase();
    const kitStatusLower = (order.kitStatus || "").toLowerCase();

    if (statusLower === "delivered") {
      activeIndex = 12;
    } else if (statusLower === "shipped" || statusLower === "ready for dispatch") {
      activeIndex = 11;
    } else if (statusLower === "finishing & polishing") {
      activeIndex = 10;
    } else if (statusLower === "drying process") {
      activeIndex = 9;
    } else if (statusLower === "resin casting") {
      activeIndex = 8;
    } else if (statusLower === "design planning") {
      activeIndex = 7;
    } else if (statusLower === "flowers received") {
      activeIndex = 6;
    } else if (statusLower === "waiting for flowers" || statusLower === "order received") {
      if (kitStatusLower === "delivered") {
        if (order.courierDetails && order.courierDetails.toLowerCase().includes("flower")) {
          activeIndex = 5; // Flowers Shipped
        } else {
          activeIndex = 3; // Kit Delivered
        }
      } else if (kitStatusLower === "shipped") {
        activeIndex = 2; // Kit Shipped
      } else if (kitStatusLower === "packed") {
        activeIndex = 1; // Kit Packed
      } else {
        activeIndex = 0; // Order Received
      }
    }
  } else {
    const currentStageIndex = stages.findIndex(s => s.toLowerCase() === order.status.toLowerCase());
    activeIndex = currentStageIndex === -1 ? 0 : currentStageIndex;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <ScrollReveal>
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-gold mb-10 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </ScrollReveal>

      {/* Header Card */}
      <ScrollReveal delay={100}>
        <div className="glass-card rounded-3xl p-8 md:p-10 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Package className="h-40 w-40" />
          </div>
          
          <div className="relative z-10">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Tracking Portal</div>
            <h1 className="font-display text-4xl mb-6">{order.id}</h1>
            
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Customer</div>
                <div className="font-medium text-base">{order.customerName}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Product</div>
                <div className="font-medium text-base">{order.productName} <span className="text-muted-foreground text-sm font-normal">({order.depth})</span></div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Current Status</div>
                <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-gold/20">
                  {order.status}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock className="h-3 w-3" /> Expected Completion</div>
                <div className="font-medium text-base text-foreground">{order.expectedCompletionDate}</div>
              </div>

              {order.courierDetails && (
                <div className="sm:col-span-2 p-4 rounded-xl bg-gold/10 border border-gold/20 flex items-start gap-3 mt-2">
                  <Truck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-gold text-[10px] uppercase tracking-widest font-semibold mb-1">Courier & Tracking Details</div>
                    <div className="text-sm font-medium">{order.courierDetails}</div>
                  </div>
                </div>
              )}

              {order.adminNotes && (
                <div className="sm:col-span-2 p-4 rounded-xl bg-secondary/50 border border-border flex items-start gap-3 mt-2">
                  <Sparkles className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold mb-1">Message from Studio</div>
                    <div className="text-sm italic text-foreground/80 whitespace-pre-wrap">{order.adminNotes}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Payment Status Card */}
      {order.paymentStatus && (
        <ScrollReveal delay={120}>
          <div className={`glass-card rounded-3xl p-6 md:p-8 mb-10 border relative overflow-hidden ${
            order.paymentStatus === "Fully Paid"
              ? "border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent"
              : order.paymentStatus === "Starter Kit Advance Paid"
              ? "border-gold/30 bg-gradient-to-br from-gold/5 to-transparent"
              : order.paymentStatus === "Final Payment Pending"
              ? "border-orange-400/30 bg-gradient-to-br from-orange-400/5 to-transparent"
              : "border-border bg-gradient-to-br from-secondary/30 to-transparent"
          }`}>
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                order.paymentStatus === "Fully Paid"
                  ? "bg-green-500/15"
                  : order.paymentStatus === "Starter Kit Advance Paid"
                  ? "bg-gold/15"
                  : order.paymentStatus === "Final Payment Pending"
                  ? "bg-orange-400/15"
                  : "bg-secondary"
              }`}>
                {order.paymentStatus === "Fully Paid" ? "✅"
                  : order.paymentStatus === "Starter Kit Advance Paid" ? "🟡"
                  : order.paymentStatus === "Final Payment Pending" ? "🟠"
                  : "💳"}
              </div>
              <div className="flex-1">
                <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-1">Payment</div>
                {order.paymentStatus === "Fully Paid" ? (
                  <>
                    <div className="font-display text-xl text-green-600 font-semibold">✔ Fully Paid</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Your order is fully paid. Sit back and let Manjima create your eternal memory.
                    </p>
                  </>
                ) : order.paymentStatus === "Starter Kit Advance Paid" ? (
                  <>
                    <div className="font-display text-xl text-gold font-semibold">✔ Starter Kit Advance Paid</div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Your kit advance has been received. The remaining balance will be collected once your flowers safely reach our Calicut studio.
                    </p>
                  </>
                ) : order.paymentStatus === "Final Payment Pending" ? (
                  <>
                    <div className="font-display text-xl text-orange-500 font-semibold">Final Payment Pending</div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Your flowers have arrived safely. Please complete the final payment to begin production.
                      Contact Manjima on WhatsApp to proceed.
                    </p>
                    <a
                      href={`https://wa.me/917591947287?text=${encodeURIComponent(`Hi Manjima, I would like to make the final payment for my order *${order.id}*.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#25D366]/20 transition"
                    >
                      💬 Message on WhatsApp
                    </a>
                  </>
                ) : (
                  <>
                    <div className="font-display text-xl text-foreground/70">No Payment Yet</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Payment will be collected once your order is confirmed and processed by our studio.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {order.previewImage && (
        <ScrollReveal delay={150}>
          <div className="glass-card rounded-3xl p-6 md:p-8 mb-12 border-gold/30 shadow-[0_0_20px_rgba(201,161,74,0.1)]">
            <h2 className="font-display text-2xl mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-gold" />{" "}
              {order.submissionMethod === "upload" && (order.status === "Order Received" || order.status === "Waiting For Images")
                ? "Your Uploaded Memory Photo"
                : "Latest Production Photo"}
            </h2>
            <div className="rounded-2xl overflow-hidden border border-border">
              <img src={order.previewImage} alt="Production Update" className="w-full h-auto max-h-[400px] object-cover" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground uppercase tracking-wider text-center">
              {order.submissionMethod === "upload" && (order.status === "Order Received" || order.status === "Waiting For Images")
                ? "This memory/reference photo will be beautifully embedded in your resin art"
                : "Preview from Manjima Studio"}
            </p>
          </div>
        </ScrollReveal>
      )}

      {/* Dynamic Milestones Timeline */}
      {order.timeline && order.timeline.length > 0 && (
        <ScrollReveal delay={180}>
          <div className="glass-card rounded-3xl p-6 md:p-8 mb-12 border border-gold/20 shadow-[0_0_20px_rgba(201,161,74,0.05)]">
            <h2 className="font-display text-2xl mb-8 flex items-center gap-3 text-gold">
              <Sparkles className="h-5 w-5" /> Production Progress History
            </h2>
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-border/60">
              {order.timeline.map((item: any, index: number) => {
                const isLatest = index === order.timeline.length - 1;
                return (
                  <div key={index} className="relative flex gap-6">
                    {/* Circle Node */}
                    <div className={`z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm ring-1 ${isLatest ? 'ring-gold text-gold bg-gold/5 animate-pulse' : 'ring-border text-muted-foreground'}`}>
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    {/* Progress Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className={`text-sm font-semibold tracking-wide ${isLatest ? 'text-gold' : 'text-foreground/80'}`}>{item.status}</h4>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {item.timestamp ? new Date(item.timestamp).toLocaleDateString("en-IN", { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : ""}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed italic">{item.note || `Order status updated to ${item.status}.`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Flower Preservation Starter Kit Customer Helper Card */}
      {isKitOrder && order.kitStatus === "Delivered" && (order.status === "Waiting For Flowers" || order.status === "Order Received") && (
        <ScrollReveal delay={190}>
          <div className="glass-card rounded-3xl p-6 md:p-8 mb-12 border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-2.5 text-gold">
              <Flower2 className="h-6 w-6" />
              <h3 className="font-display text-xl font-semibold">Dry & Ship Your Flowers</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Now that your <span className="text-foreground font-semibold">Preservation Starter Kit</span> has been delivered, please begin drying your wedding flowers using the included silica gel and instruction card.
            </p>
            <div className="bg-[#f5f0e6]/45 p-4 rounded-xl border border-gold/20 text-xs text-[#8f6d23] leading-relaxed space-y-2">
              <p><strong>💡 Step 1:</strong> Use the 1kg silica gel and airtight container to dry your flowers.</p>
              <p><strong>💡 Step 2:</strong> Once fully dried, pack them safely in the airtight container.</p>
              <p><strong>💡 Step 3:</strong> Ship them to our Calicut studio using <strong>DTDC Courier</strong>.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href={`https://wa.me/917591947287?text=${encodeURIComponent(`Hi Manjima, I have received the Preservation Starter Kit for my order *${order.id}*. I will begin drying my flowers and ship them soon!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-5 py-3 border border-gold text-gold hover:bg-gold/5 rounded-full text-xs uppercase tracking-wider font-semibold transition hover:scale-[1.01]"
              >
                💬 Got the Kit! Start Drying
              </a>
              <a 
                href={`https://wa.me/917591947287?text=${encodeURIComponent(`Hi Manjima, I have shipped my dried wedding flowers for order *${order.id}*!\n\nCourier Name: DTDC\nTracking ID: [Please type your tracking ID here]`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-5 py-3 bg-gold text-primary-foreground rounded-full text-xs uppercase tracking-wider font-semibold hover:opacity-90 shadow-gold transition-all hover:scale-[1.01]"
              >
                🚚 I have Shipped My Flowers →
              </a>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Timeline */}
      <ScrollReveal delay={200}>
        <div className="pl-4 md:pl-8">
          <h2 className="font-display text-2xl mb-10">Production Timeline</h2>
          
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gold before:via-border before:to-border">
            {stages.map((stage, index) => {
              const isCompleted = index < activeIndex;
              const isCurrent = index === activeIndex;
              const isDryingProcess = isKitOrder ? index === 9 : index === 5;
              
              return (
                <div key={index} className={`relative flex items-center gap-6 ${isCompleted ? 'opacity-70' : isCurrent ? 'opacity-100' : 'opacity-40'}`}>
                  {/* Icon Node */}
                  <div className={`z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm ring-1 ${isCompleted ? 'ring-gold text-gold bg-gold/5' : isCurrent ? 'ring-gold text-gold ring-offset-4 ring-offset-background' : 'ring-border text-muted-foreground'}`}>
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : isCurrent ? <div className="h-2.5 w-2.5 rounded-full bg-gold" /> : <Circle className="h-3 w-3" />}
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 glass-card rounded-2xl p-5 ${isCurrent ? 'border-gold shadow-[0_0_15px_rgba(201,161,74,0.15)]' : 'border-border/50'} ${isDryingProcess && isCurrent ? 'bg-gold/5' : ''}`}>
                    <h3 className={`font-medium tracking-wide flex items-center gap-2 ${isCurrent ? 'text-gold' : 'text-foreground'}`}>
                      {stage}
                      {isDryingProcess && <Sparkles className="h-4 w-4 text-gold animate-pulse" />}
                    </h3>
                    
                    {stage === "Kit Delivered" && (
                      <p className="text-[11px] text-gold font-medium mt-1 leading-relaxed italic">
                        “Please begin drying your flowers using the included instruction guide.”
                      </p>
                    )}
                    
                    {isCurrent && (
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {isKitOrder ? (
                          <>
                            {index === 0 && "Your order has been logged into our system."}
                            {index === 1 && "Your Flower Preservation Starter Kit is currently being packed by our artist."}
                            {index === 2 && "Your Flower Preservation Starter Kit has been shipped! Check back soon for delivery."}
                            {index === 3 && "Your Preservation Kit has been delivered! Please begin drying your flowers using the included instruction guide."}
                            {index === 4 && "Great job! Please proceed to dry your flowers completely over the next few days."}
                            {index === 5 && "Your dried flowers are packed and shipped! We are awaiting arrival at our Calicut studio."}
                            {index === 6 && "Your dried flowers have safely arrived at our studio! The preservation stage starts now."}
                            {index === 7 && "Manjima is sketching and planning the perfect layout for your custom piece."}
                            {index === 8 && "The first layers of crystal clear resin are being cast and poured."}
                            {index === 9 && (
                              <span className="text-foreground/80 font-medium italic">
                                This is the most crucial stage. Perfect curing takes time to ensure zero bubbles and absolute clarity. Thank you for your patience!
                              </span>
                            )}
                            {index === 10 && "Sanding, polishing, and refining the edges to perfection."}
                            {index === 11 && "Your piece is complete and ready for dispatch! We are packaging it safely."}
                            {index === 12 && "Delivered. We hope you love your eternal memory."}
                          </>
                        ) : (
                          <>
                            {index === 0 && "Your order has been logged into our system."}
                            {index === 1 && (isUpload ? "We are waiting for you to upload your images." : "We are waiting for your bouquet to arrive at our studio safely.")}
                            {index === 2 && "Your precious memories have safely arrived!"}
                            {index === 3 && "Manjima is sketching and planning the perfect layout for your piece."}
                            {index === 4 && "The first layers of crystal clear resin are being poured."}
                            {index === 5 && (
                              <span className="text-foreground/80 font-medium italic">
                                This is the most crucial stage. Perfect curing takes time to ensure zero bubbles and absolute clarity. Thank you for your patience!
                              </span>
                            )}
                            {index === 6 && "Sanding, polishing, and refining the edges to perfection."}
                            {index === 7 && "Your piece is complete! We are packing it safely."}
                            {index === 8 && "Dispatched! Your tracking number will be updated here shortly."}
                            {index === 9 && "Delivered. We hope you love your eternal memory."}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
