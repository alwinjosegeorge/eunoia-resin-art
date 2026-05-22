import { W as reactExports, L as jsxRuntimeExports } from "./server-DAJe76I7.js";
import { d as Route, u as useNavigate, L as Link, P as Package } from "./router-JlluT2Qz.js";
import { p as pricingVariants, f as formatINR } from "./products-C1BMDhgH.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { A as ArrowLeft } from "./arrow-left-C-yh21Ic.js";
import { H as Heart } from "./heart-BSJN8Kdr.js";
import { C as Check } from "./check-DfjNuiqL.js";
import { C as Clock } from "./clock-CqTE6gF1.js";
import { S as ShieldCheck } from "./shield-check-BHavcAhI.js";
import { T as Truck } from "./truck-CQi_61KG.js";
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
import "./product-teakframe-DKClPXyG.js";
function ProductPage() {
  const {
    product
  } = Route.useLoaderData();
  const navigate = useNavigate();
  const isDbProduct = !!product.pricingMatrix && product.pricingMatrix.length > 0;
  const [selectedVariantId, setSelectedVariantId] = reactExports.useState(isDbProduct ? "" : pricingVariants[0].id);
  const [selectedDepth, setSelectedDepth] = reactExports.useState(isDbProduct ? "" : "15mm");
  const [selectedDbSize, setSelectedDbSize] = reactExports.useState(isDbProduct ? product.selectedSizes?.[0] || "" : "");
  const [selectedDbDepth, setSelectedDbDepth] = reactExports.useState(isDbProduct ? product.selectedDepths?.[0] || "" : "");
  const [notes, setNotes] = reactExports.useState("");
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const [submissionMethod, setSubmissionMethod] = reactExports.useState("ship");
  const [preBookingKit, setPreBookingKit] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (submissionMethod === "upload") {
      setPreBookingKit(false);
    }
  }, [submissionMethod]);
  reactExports.useEffect(() => {
    if (isDbProduct) {
      setSelectedDbSize(product.selectedSizes?.[0] || "");
      setSelectedDbDepth(product.selectedDepths?.[0] || "");
    } else {
      setSelectedVariantId(pricingVariants[0].id);
      setSelectedDepth("15mm");
    }
    setActiveImage(0);
  }, [product, isDbProduct]);
  const gallery = product.gallery && product.gallery.length > 0 ? [product.image, ...product.gallery].filter(Boolean) : [product.image, product.image, product.image].filter(Boolean);
  let currentPrice = 0;
  if (isDbProduct) {
    const matchedRow = product.pricingMatrix?.find((r) => r.size === selectedDbSize && r.depth === selectedDbDepth);
    currentPrice = Number(matchedRow?.price) || Number(product.pricingMatrix?.[0]?.price) || 0;
  } else {
    const selectedVariant = pricingVariants.find((v) => v.id === selectedVariantId);
    currentPrice = selectedVariant?.depths ? selectedVariant.depths.find((d) => d.size === selectedDepth)?.price || selectedVariant.depths[0].price || 0 : selectedVariant?.basePrice || 0;
  }
  const handleBookNow = () => {
    navigate({
      to: "/checkout",
      search: {
        variantId: isDbProduct ? product.id : selectedVariantId,
        depth: isDbProduct ? selectedDbDepth : selectedDepth,
        notes,
        submissionMethod,
        preBookingKit: String(preBookingKit),
        ...isDbProduct ? {
          size: selectedDbSize,
          isDbProduct: "true"
        } : {}
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 pt-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " Back to Shop"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-gold transition-colors", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-gold transition-colors", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-medium truncate max-w-[120px] md:max-w-[200px]", children: product.name })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-28 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gallery[activeImage], alt: product.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2 scrollbar-thin", children: gallery.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveImage(idx), className: `h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${activeImage === idx ? "border-gold" : "border-transparent hover:border-gold/50"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: `${product.name} ${idx + 1}`, className: "w-full h-full object-cover" }) }, idx)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.35em] uppercase text-gold", children: product.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mt-2", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl text-foreground font-medium", children: formatINR(currentPrice + (preBookingKit ? 450 : 0)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm line-through text-muted-foreground", children: formatINR(Math.round((currentPrice + (preBookingKit ? 450 : 0)) * 1.25)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded", children: "20% off" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground leading-relaxed", children: product.description }),
        (isDbProduct ? product.selectedSizes?.length > 0 : true) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-wide font-medium", children: "Frame Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: isDbProduct ? selectedDbSize : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              selectedVariantId === "5x5-frame" && "5×5 Frame",
              selectedVariantId === "6x6-teak" && "6×6 Frame",
              selectedVariantId === "9x12-teak" && "9×12 Frame",
              selectedVariantId === "12x16" && "12×16 Frame"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2", children: isDbProduct ? product.selectedSizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedDbSize(s), className: `py-2 rounded text-xs transition border ${selectedDbSize === s ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`, children: s }, s)) : [{
            id: "5x5-frame",
            label: "5×5 Frame"
          }, {
            id: "6x6-teak",
            label: "6×6 Frame"
          }, {
            id: "9x12-teak",
            label: "9×12 Frame"
          }, {
            id: "12x16",
            label: "12×16 Frame"
          }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedVariantId(f.id), className: `py-2 rounded text-xs transition border ${selectedVariantId === f.id ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`, children: f.label }, f.id)) })
        ] }),
        (isDbProduct ? product.selectedDepths?.length > 0 : true) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 animate-in fade-in slide-in-from-top-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-wide font-medium", children: "Resin Depth" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: isDbProduct ? selectedDbDepth : selectedDepth })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-4 gap-2", children: isDbProduct ? product.selectedDepths.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedDbDepth(d), className: `py-2 rounded text-xs transition border ${selectedDbDepth === d ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`, children: d }, d)) : ["10mm", "15mm", "20mm", "30mm"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedDepth(d), className: `py-2 rounded text-xs transition border ${selectedDepth === d ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`, children: d }, d)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-widest uppercase text-muted-foreground font-medium block mb-3", children: "Memory Preservation Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSubmissionMethod("ship"), className: `flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${submissionMethod === "ship" ? "border-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.15)] text-gold font-medium" : "border-border text-muted-foreground hover:border-gold"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold tracking-wide flex items-center gap-1.5 uppercase tracking-[0.1em]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
                " Ship Real Flowers"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] opacity-80 mt-1", children: "Send us your bouquet" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSubmissionMethod("upload"), className: `flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${submissionMethod === "upload" ? "border-gold bg-gold/5 shadow-[0_0_10px_rgba(201,161,74,0.15)] text-gold font-medium" : "border-border text-muted-foreground hover:border-gold"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold tracking-wide flex items-center gap-1.5 uppercase tracking-[0.1em]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
                " Upload Images Only"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] opacity-80 mt-1", children: "Photo-based resin art" })
            ] })
          ] })
        ] }),
        submissionMethod === "ship" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 animate-in fade-in slide-in-from-top-2 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setPreBookingKit(!preBookingKit), className: `cursor-pointer rounded-2xl border p-5 transition-all relative overflow-hidden flex flex-col gap-4 ${preBookingKit ? "border-gold bg-[#f5f0e6] shadow-[0_4px_20px_rgba(201,161,74,0.15)]" : "border-border bg-secondary/10 hover:border-gold/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tracking-wide text-foreground", children: "Flower Preservation Starter Kit" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-gold/20 text-gold px-2.5 py-0.5 rounded-full font-bold", children: "+₹450" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: "Protect your wedding flowers before shipping them to our studio." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-5 w-5 rounded border flex items-center justify-center transition-all ${preBookingKit ? "border-gold bg-gold text-primary-foreground" : "border-muted-foreground/40 bg-background"}`, children: preBookingKit && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-widest uppercase text-muted-foreground font-medium block mb-2", children: "Included in kit:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1.5", children: "✦ 1kg Silica Gel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1.5", children: "✦ Protective Gloves" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1.5", children: "✦ Airtight Container" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1.5", children: "✦ Preservation Instruction Card" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-gold font-medium italic mt-1 border-t border-border/20 pt-2 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✨" }),
              " Recommended for upcoming weddings & advance bookings."
            ] })
          ] }),
          preBookingKit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-4 rounded-xl bg-[#f5f0e6]/70 border border-gold/20 text-xs text-[#8f6d23] leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[10px] tracking-widest uppercase mb-1 flex items-center gap-1", children: "🌸 Why This Kit Helps" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This preservation kit helps reduce flower discoloration, moisture damage, and petal decay before your memories safely reach our studio." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-1 gap-3", children: [
          (!isDbProduct || product.showProductionTime !== false) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl border border-border p-4 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex-shrink-0 h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Production Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "30–35 working days",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "(Saturdays & Sundays excluded)"
              ] })
            ] })
          ] }),
          (!isDbProduct || product.showPayment !== false) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl border border-border p-4 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex-shrink-0 h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Payment Process" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Payment will be collected after your flowers safely reach our studio." })
            ] })
          ] }),
          (!isDbProduct || product.showShipping !== false) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl border border-border p-4 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex-shrink-0 h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Shipping Included" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Shipping charges included in all prices." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleBookNow, className: "w-full flex items-center justify-center gap-3 bg-gold text-primary-foreground rounded-full py-4 text-sm tracking-[0.25em] uppercase hover:opacity-90 hover:scale-[1.01] transition-all shadow-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
          " Book Now"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-6 text-[11px] tracking-wide text-muted-foreground uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-gold" }),
            " Handmade with Love"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-3.5 w-3.5 text-gold" }),
            " Ships securely"
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ProductPage as component
};
