import { W as reactExports, L as jsxRuntimeExports } from "./server-DAJe76I7.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { C as ChevronDown } from "./chevron-down-DVQQy4d0.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./router-JlluT2Qz.js";
import "../server.js";
import "./db-DGtz6qNV.js";
import "mongoose";
import "./Order-BLRCJfVf.js";
import "./Product-CT5CWCn6.js";
const faqs = [{
  q: "How long does a custom commission take?",
  a: "Most pieces require 32–45 days from start to finish — the flowers must be properly dried, the resin must cure in layers, and each piece is hand-polished."
}, {
  q: "Do you ship internationally?",
  a: "Yes — we ship worldwide with insured, fragile-safe packaging. Shipping is complimentary on all custom commissions above ₹8,000."
}, {
  q: "Will my flowers retain their colour?",
  a: "We use museum-grade UV-stable epoxy and proprietary drying techniques. Colours stay vibrant for generations when displayed away from direct sunlight."
}, {
  q: "Can I preserve flowers from a memorial?",
  a: "Absolutely. Memorial preservation is one of our most cherished services — we treat every piece with the utmost care and discretion."
}, {
  q: "What if my bouquet is wilted?",
  a: "Even if your bouquet has begun to wilt, we can almost always preserve it. Refrigerate it immediately and ship overnight — we'll handle the rest."
}, {
  q: "Can I include other mementos with the flowers?",
  a: "Yes — wedding rings, ribbons, locks of hair, baby teeth, handwritten notes. Tell Manjima during your commission consultation."
}, {
  q: "How do I care for my finished piece?",
  a: "Wipe gently with a soft microfibre cloth. Avoid harsh chemicals and direct sunlight. Each piece arrives with a detailed care card."
}, {
  q: "Do you offer gift wrapping?",
  a: "Every piece arrives in our signature silk-lined box with satin ribbon and gold wax seal — already gift-ready."
}];
function FAQPage() {
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-6 pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] uppercase text-gold mb-4", children: "Frequently Asked" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Your questions, answered." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: faqs.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 50, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(open === i ? null : i), className: "w-full flex items-center justify-between gap-4 p-6 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg", children: f.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-5 w-5 text-gold shrink-0 transition-transform ${open === i ? "rotate-180" : ""}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-6 text-sm text-muted-foreground leading-relaxed", children: f.a }) }) })
    ] }) }, f.q)) })
  ] });
}
export {
  FAQPage as component
};
