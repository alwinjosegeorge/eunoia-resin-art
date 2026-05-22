import { L as jsxRuntimeExports } from "./server-DAJe76I7.js";
import { e as createLucideIcon, L as Link } from "./router-JlluT2Qz.js";
import { B as BeforeAfter, b as before, a as after } from "./BeforeAfter-BJK8KrXV.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { F as FloatingPetals } from "./FloatingPetals-CENI_17F.js";
import { D as Droplets } from "./droplets-C7y3n1--.js";
import { S as Sparkles } from "./sparkles-D7CLvB__.js";
import { T as Truck } from "./truck-CQi_61KG.js";
import { C as Check } from "./check-DfjNuiqL.js";
import { A as ArrowRight } from "./arrow-right-0CiJ48Oi.js";
import { H as Heart } from "./heart-BSJN8Kdr.js";
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
const __iconNode$2 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
];
const ClipboardCheck = createLucideIcon("clipboard-check", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  ["path", { d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "1sqzm4" }],
  [
    "path",
    { d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5", key: "kc0143" }
  ],
  ["rect", { x: "3", y: "7", width: "18", height: "4", rx: "1", key: "1hberx" }]
];
const Gift = createLucideIcon("gift", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode);
const wedding = "/assets/wedding-hero-DplwdqC9.jpg";
const steps = [
  { label: "Order Confirmed", icon: ClipboardCheck },
  { label: "Artwork Designing", icon: Palette },
  { label: "Resin Curing", icon: Droplets },
  { label: "Final Polishing", icon: Sparkles },
  { label: "Packed With Love", icon: Gift },
  { label: "Shipped", icon: Truck }
];
function OrderJourney({ current = 2 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.35em] uppercase text-gold mb-3", children: "Your Order Journey" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-8", children: "Every step, handcrafted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "grid gap-6 md:grid-cols-6", children: steps.map((s, i) => {
      const done = i < current;
      const active = i === current;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex md:flex-col items-center gap-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `grid place-items-center h-12 w-12 rounded-full border transition ${done ? "bg-gold border-gold text-primary-foreground" : active ? "border-gold text-gold shadow-gold animate-pulse" : "border-border text-muted-foreground"}`,
            children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wide leading-tight", children: s.label })
      ] }, s.label);
    }) })
  ] });
}
function WeddingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPetals, { count: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] uppercase text-gold mb-5", children: "Wedding Preservation Atelier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-6xl leading-tight", children: [
            "Your wedding day, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "font-serif italic", children: "eternal" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-7 text-muted-foreground leading-relaxed max-w-md", children: "The bouquet you carried down the aisle deserves more than a memory in a photograph. Preserve every petal in crystal-clear resin, framed in your choice of teak, brass or hand-cast deepcast." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/custom", className: "mt-9 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-gold transition", children: [
            "Begin Your Heirloom ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex gap-8 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-display text-2xl block", children: "1,200+" }),
              "Brides preserved"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-display text-2xl block", children: "45" }),
              "Day delicate process"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-display text-2xl block", children: "∞" }),
              "Lifetime guarantee"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: wedding, alt: "Preserved bridal bouquet in crystal resin", loading: "lazy", className: "rounded-2xl shadow-soft w-full" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] uppercase text-gold mb-4", children: "The Transformation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl", children: "From aisle to heirloom" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfter, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-blush/30 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] uppercase text-gold mb-4", children: "Your 45-Day Journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl", children: "Every step, treated as sacred" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderJourney, { current: 2 }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
      img: before,
      t: "Send Us Your Bouquet",
      d: "Within 5 days of your wedding, refrigerate and ship overnight — we'll provide the kit and instructions."
    }, {
      img: after,
      t: "Design Together",
      d: "A 1:1 design call with Manjima to choose your frame, depth, flowers and the story you want preserved."
    }, {
      img: wedding,
      t: "Receive Your Heirloom",
      d: "Your finished piece arrives in our signature silk-lined box, sealed with gold wax. Pass it to your children."
    }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl aspect-[4/5]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.img, alt: s.t, loading: "lazy", className: "h-full w-full object-cover hover:scale-105 transition duration-1000" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: s.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s.d })
    ] }) }, s.t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-6 pb-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "mx-auto h-7 w-7 text-gold mb-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Crafted To Last Forever." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/custom", className: "mt-8 inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:opacity-90 transition", children: [
        "Preserve Your Forever ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }) })
  ] });
}
export {
  WeddingPage as component
};
