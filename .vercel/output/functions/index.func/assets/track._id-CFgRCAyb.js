import { W as reactExports, L as jsxRuntimeExports } from "./server-DAJe76I7.js";
import { e as createLucideIcon, c as Route, P as Package, L as Link } from "./router-JlluT2Qz.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { A as ArrowLeft } from "./arrow-left-C-yh21Ic.js";
import { C as Clock } from "./clock-CqTE6gF1.js";
import { T as Truck } from "./truck-CQi_61KG.js";
import { S as Sparkles } from "./sparkles-D7CLvB__.js";
import { C as CircleCheck } from "./circle-check-76IHsgEz.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../server.js";
import "./db-DGtz6qNV.js";
import "mongoose";
import "./Order-BLRCJfVf.js";
import "./Product-CT5CWCn6.js";
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
const ALL_STAGES = [
  "Order Received",
  "Waiting For Material",
  // dynamic
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
  const {
    id
  } = Route.useParams();
  const {
    order: initialOrder
  } = Route.useLoaderData();
  const [order, setOrder] = reactExports.useState(initialOrder);
  const [loading, setLoading] = reactExports.useState(!initialOrder);
  reactExports.useEffect(() => {
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
          const savedOrders = JSON.parse(localStorage.getItem("era_orders") || "[]");
          const foundOrder = savedOrders.find((o) => o.id === id);
          if (foundOrder) {
            setOrder(foundOrder);
          }
        }
      } catch (err) {
        console.error("Error fetching order tracking data:", err);
        const savedOrders = JSON.parse(localStorage.getItem("era_orders") || "[]");
        const foundOrder = savedOrders.find((o) => o.id === id);
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse text-gold tracking-widest text-sm uppercase", children: "Loading Tracking Data..." }) });
  }
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center text-center px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-12 w-12 text-muted-foreground mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl mb-2", children: "Order Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
        "We couldn't find an order with ID: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "px-6 py-3 border border-border rounded-full text-xs uppercase tracking-widest hover:border-gold transition", children: "Return Home" })
    ] });
  }
  const isUpload = order.submissionMethod === "upload";
  const stage2Name = isUpload ? "Waiting For Images" : "Waiting For Flowers";
  const isKitOrder = order.preBookingKit === true;
  const stages = isKitOrder ? ["Order Received", "Kit Packed", "Kit Shipped", "Kit Delivered", "Flowers Prepared", "Flowers Shipped", "Flowers Received", "Design Planning", "Resin Casting", "Drying Process", "Finishing & Polishing", "Ready For Dispatch", "Delivered"] : [...ALL_STAGES];
  if (!isKitOrder) {
    stages[1] = stage2Name;
    if (isUpload) {
      stages[2] = "Images Received";
    }
  }
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
          activeIndex = 5;
        } else {
          activeIndex = 3;
        }
      } else if (kitStatusLower === "shipped") {
        activeIndex = 2;
      } else if (kitStatusLower === "packed") {
        activeIndex = 1;
      } else {
        activeIndex = 0;
      }
    }
  } else {
    const currentStageIndex = stages.findIndex((s) => s.toLowerCase() === order.status.toLowerCase());
    activeIndex = currentStageIndex === -1 ? 0 : currentStageIndex;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 py-12 md:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-gold mb-10 transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to Home"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-8 md:p-10 mb-12 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-8 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-40 w-40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] uppercase text-gold mb-2", children: "Tracking Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mb-6", children: order.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs uppercase tracking-wider mb-1", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-base", children: order.customerName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs uppercase tracking-wider mb-1", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-base", children: [
              order.productName,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm font-normal", children: [
                "(",
                order.depth,
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs uppercase tracking-wider mb-1", children: "Current Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-gold/20", children: order.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " Expected Completion"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-base text-foreground", children: order.expectedCompletionDate })
          ] }),
          order.courierDetails && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 p-4 rounded-xl bg-gold/10 border border-gold/20 flex items-start gap-3 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-5 w-5 text-gold shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gold text-[10px] uppercase tracking-widest font-semibold mb-1", children: "Courier & Tracking Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: order.courierDetails })
            ] })
          ] }),
          order.adminNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 p-4 rounded-xl bg-secondary/50 border border-border flex items-start gap-3 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-muted-foreground shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-[10px] uppercase tracking-widest font-semibold mb-1", children: "Message from Studio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm italic text-foreground/80 whitespace-pre-wrap", children: order.adminNotes })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    order.paymentStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `glass-card rounded-3xl p-6 md:p-8 mb-10 border relative overflow-hidden ${order.paymentStatus === "Fully Paid" ? "border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent" : order.paymentStatus === "Starter Kit Advance Paid" ? "border-gold/30 bg-gradient-to-br from-gold/5 to-transparent" : order.paymentStatus === "Final Payment Pending" ? "border-orange-400/30 bg-gradient-to-br from-orange-400/5 to-transparent" : "border-border bg-gradient-to-br from-secondary/30 to-transparent"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-lg ${order.paymentStatus === "Fully Paid" ? "bg-green-500/15" : order.paymentStatus === "Starter Kit Advance Paid" ? "bg-gold/15" : order.paymentStatus === "Final Payment Pending" ? "bg-orange-400/15" : "bg-secondary"}`, children: order.paymentStatus === "Fully Paid" ? "✅" : order.paymentStatus === "Starter Kit Advance Paid" ? "🟡" : order.paymentStatus === "Final Payment Pending" ? "🟠" : "💳" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-1", children: "Payment" }),
        order.paymentStatus === "Fully Paid" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl text-green-600 font-semibold", children: "✔ Fully Paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: "Your order is fully paid. Sit back and let Manjima create your eternal memory." })
        ] }) : order.paymentStatus === "Starter Kit Advance Paid" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl text-gold font-semibold", children: "✔ Starter Kit Advance Paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 leading-relaxed", children: "Your kit advance has been received. The remaining balance will be collected once your flowers safely reach our Calicut studio." })
        ] }) : order.paymentStatus === "Final Payment Pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl text-orange-500 font-semibold", children: "Final Payment Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 leading-relaxed", children: "Your flowers have arrived safely. Please complete the final payment to begin production. Contact Manjima on WhatsApp to proceed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/917591947287?text=${encodeURIComponent(`Hi Manjima, I would like to make the final payment for my order *${order.id}*.`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#25D366]/20 transition", children: "💬 Message on WhatsApp" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl text-foreground/70", children: "No Payment Yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: "Payment will be collected once your order is confirmed and processed by our studio." })
        ] })
      ] })
    ] }) }) }),
    order.previewImage && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 md:p-8 mb-12 border-gold/30 shadow-[0_0_20px_rgba(201,161,74,0.1)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl mb-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-gold" }),
        " ",
        order.submissionMethod === "upload" && (order.status === "Order Received" || order.status === "Waiting For Images") ? "Your Uploaded Memory Photo" : "Latest Production Photo"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: order.previewImage, alt: "Production Update", className: "w-full h-auto max-h-[400px] object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground uppercase tracking-wider text-center", children: order.submissionMethod === "upload" && (order.status === "Order Received" || order.status === "Waiting For Images") ? "This memory/reference photo will be beautifully embedded in your resin art" : "Preview from Manjima Studio" })
    ] }) }),
    order.timeline && order.timeline.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 md:p-8 mb-12 border border-gold/20 shadow-[0_0_20px_rgba(201,161,74,0.05)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl mb-8 flex items-center gap-3 text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
        " Production Progress History"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-border/60", children: order.timeline.map((item, index) => {
        const isLatest = index === order.timeline.length - 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm ring-1 ${isLatest ? "ring-gold text-gold bg-gold/5 animate-pulse" : "ring-border text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `text-sm font-semibold tracking-wide ${isLatest ? "text-gold" : "text-foreground/80"}`, children: item.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: item.timestamp ? new Date(item.timestamp).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground leading-relaxed italic", children: item.note || `Order status updated to ${item.status}.` })
          ] })
        ] }, index);
      }) })
    ] }) }),
    isKitOrder && order.kitStatus === "Delivered" && (order.status === "Waiting For Flowers" || order.status === "Order Received") && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 190, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 md:p-8 mb-12 border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent space-y-4 animate-in fade-in slide-in-from-top-4 duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flower2, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold", children: "Dry & Ship Your Flowers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
        "Now that your ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Preservation Starter Kit" }),
        " has been delivered, please begin drying your wedding flowers using the included silica gel and instruction card."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#f5f0e6]/45 p-4 rounded-xl border border-gold/20 text-xs text-[#8f6d23] leading-relaxed space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "💡 Step 1:" }),
          " Use the 1kg silica gel and airtight container to dry your flowers."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "💡 Step 2:" }),
          " Once fully dried, pack them safely in the airtight container."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "💡 Step 3:" }),
          " Ship them to our Calicut studio using ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "DTDC Courier" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/917591947287?text=${encodeURIComponent(`Hi Manjima, I have received the Preservation Starter Kit for my order *${order.id}*. I will begin drying my flowers and ship them soon!`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex justify-center items-center px-5 py-3 border border-gold text-gold hover:bg-gold/5 rounded-full text-xs uppercase tracking-wider font-semibold transition hover:scale-[1.01]", children: "💬 Got the Kit! Start Drying" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/917591947287?text=${encodeURIComponent(`Hi Manjima, I have shipped my dried wedding flowers for order *${order.id}*!

Courier Name: DTDC
Tracking ID: [Please type your tracking ID here]`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex justify-center items-center px-5 py-3 bg-gold text-primary-foreground rounded-full text-xs uppercase tracking-wider font-semibold hover:opacity-90 shadow-gold transition-all hover:scale-[1.01]", children: "🚚 I have Shipped My Flowers →" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-4 md:pl-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl mb-10", children: "Production Timeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gold before:via-border before:to-border", children: stages.map((stage, index) => {
        const isCompleted = index < activeIndex;
        const isCurrent = index === activeIndex;
        const isDryingProcess = isKitOrder ? index === 9 : index === 5;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex items-center gap-6 ${isCompleted ? "opacity-70" : isCurrent ? "opacity-100" : "opacity-40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm ring-1 ${isCompleted ? "ring-gold text-gold bg-gold/5" : isCurrent ? "ring-gold text-gold ring-offset-4 ring-offset-background" : "ring-border text-muted-foreground"}`, children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5" }) : isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-gold" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3 w-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex-1 glass-card rounded-2xl p-5 ${isCurrent ? "border-gold shadow-[0_0_15px_rgba(201,161,74,0.15)]" : "border-border/50"} ${isDryingProcess && isCurrent ? "bg-gold/5" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: `font-medium tracking-wide flex items-center gap-2 ${isCurrent ? "text-gold" : "text-foreground"}`, children: [
              stage,
              isDryingProcess && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-gold animate-pulse" })
            ] }),
            stage === "Kit Delivered" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gold font-medium mt-1 leading-relaxed italic", children: "“Please begin drying your flowers using the included instruction guide.”" }),
            isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed", children: isKitOrder ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              index === 0 && "Your order has been logged into our system.",
              index === 1 && "Your Flower Preservation Starter Kit is currently being packed by our artist.",
              index === 2 && "Your Flower Preservation Starter Kit has been shipped! Check back soon for delivery.",
              index === 3 && "Your Preservation Kit has been delivered! Please begin drying your flowers using the included instruction guide.",
              index === 4 && "Great job! Please proceed to dry your flowers completely over the next few days.",
              index === 5 && "Your dried flowers are packed and shipped! We are awaiting arrival at our Calicut studio.",
              index === 6 && "Your dried flowers have safely arrived at our studio! The preservation stage starts now.",
              index === 7 && "Manjima is sketching and planning the perfect layout for your custom piece.",
              index === 8 && "The first layers of crystal clear resin are being cast and poured.",
              index === 9 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80 font-medium italic", children: "This is the most crucial stage. Perfect curing takes time to ensure zero bubbles and absolute clarity. Thank you for your patience!" }),
              index === 10 && "Sanding, polishing, and refining the edges to perfection.",
              index === 11 && "Your piece is complete and ready for dispatch! We are packaging it safely.",
              index === 12 && "Delivered. We hope you love your eternal memory."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              index === 0 && "Your order has been logged into our system.",
              index === 1 && (isUpload ? "We are waiting for you to upload your images." : "We are waiting for your bouquet to arrive at our studio safely."),
              index === 2 && "Your precious memories have safely arrived!",
              index === 3 && "Manjima is sketching and planning the perfect layout for your piece.",
              index === 4 && "The first layers of crystal clear resin are being poured.",
              index === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80 font-medium italic", children: "This is the most crucial stage. Perfect curing takes time to ensure zero bubbles and absolute clarity. Thank you for your patience!" }),
              index === 6 && "Sanding, polishing, and refining the edges to perfection.",
              index === 7 && "Your piece is complete! We are packing it safely.",
              index === 8 && "Dispatched! Your tracking number will be updated here shortly.",
              index === 9 && "Delivered. We hope you love your eternal memory."
            ] }) })
          ] })
        ] }, index);
      }) })
    ] }) })
  ] });
}
export {
  TrackOrderPage as component
};
