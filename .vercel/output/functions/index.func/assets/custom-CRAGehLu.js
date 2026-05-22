import { W as reactExports, L as jsxRuntimeExports } from "./server-DAJe76I7.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { P as Popover, c as PopoverTrigger, C as Calendar, f as format, d as cn, b as PopoverContent, a as Calendar$1 } from "./popover-BC-oxNQi.js";
import { H as Heart } from "./heart-BSJN8Kdr.js";
import { F as FloatingPetals } from "./FloatingPetals-CENI_17F.js";
import { f as formatINR } from "./products-C1BMDhgH.js";
import { U as Upload } from "./upload-BL0ZDunK.js";
import { e as createLucideIcon } from "./router-JlluT2Qz.js";
import { S as Sparkles } from "./sparkles-D7CLvB__.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./chevron-right-BXp7_LEW.js";
import "./chevron-down-DVQQy4d0.js";
import "./product-teakframe-DKClPXyG.js";
import "../server.js";
import "./db-DGtz6qNV.js";
import "mongoose";
import "./Order-BLRCJfVf.js";
import "./Product-CT5CWCn6.js";
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const occasions = ["Wedding", "Baby", "Anniversary", "Proposal"];
function MemoryDate() {
  const [type, setType] = reactExports.useState("Wedding");
  const [date, setDate] = reactExports.useState();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-7 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.35em] uppercase text-gold mb-3 text-left", children: "Memory Timeline" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-6 text-left", children: "When did this memory begin?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: occasions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setType(o),
        className: `px-4 py-1.5 rounded-full text-xs tracking-wide transition border ${type === o ? "bg-gold text-primary-foreground border-gold shadow-[0_0_10px_rgba(201,161,74,0.3)]" : "border-border text-foreground/70 hover:border-gold hover:text-foreground"}`,
        children: o
      },
      o
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: cn(
            "w-full flex items-center justify-start text-left font-normal bg-secondary/30 border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none hover:border-gold transition-colors",
            !date && "text-muted-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-3 h-4 w-4 text-gold" }),
            date ? format(date, "MMMM d, yyyy") : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-wide", children: "Pick a memorable date" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0 border-border shadow-soft", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Calendar$1,
        {
          mode: "single",
          selected: date,
          onSelect: setDate,
          initialFocus: true,
          className: "rounded-xl"
        }
      ) })
    ] }),
    date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-5 rounded-xl bg-blush/50 border border-gold/30 animate-in fade-in slide-in-from-top-2 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-lg leading-snug text-foreground", children: [
        "Your ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lowercase", children: type }),
        " memory preserved from",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold not-italic font-medium text-xl mt-1 block", children: format(date, "MMMM d, yyyy") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3 w-3 fill-gold text-gold" }),
        " Eternal Keepsake"
      ] })
    ] })
  ] });
}
const shapes = [{
  name: "Square",
  base: 2500
}, {
  name: "Round",
  base: 2800
}, {
  name: "Hexagon",
  base: 3200
}, {
  name: "Free-form",
  base: 3600
}];
const sizes = [{
  name: 'Small (6")',
  mult: 1
}, {
  name: 'Medium (9")',
  mult: 1.6
}, {
  name: 'Large (12")',
  mult: 2.4
}, {
  name: 'XL (15")',
  mult: 3.2
}];
const depthsList = [{
  name: "10mm",
  add: 0
}, {
  name: "15mm",
  add: 600
}, {
  name: "20mm",
  add: 1200
}, {
  name: "30mm",
  add: 2400
}];
const addons = [{
  name: "24k Gold Leaf",
  price: 850
}, {
  name: "Premium Teak Frame",
  price: 1800
}, {
  name: "Engraved Personalisation",
  price: 650
}, {
  name: "Velvet Gift Box Upgrade",
  price: 450
}, {
  name: "Express Production (15 days)",
  price: 1500
}];
function CustomPage() {
  const [shape, setShape] = reactExports.useState(shapes[0]);
  const [size, setSize] = reactExports.useState(sizes[1]);
  const [depth, setDepth] = reactExports.useState(depthsList[1]);
  const [picked, setPicked] = reactExports.useState(["24k Gold Leaf"]);
  const [story, setStory] = reactExports.useState("");
  const [quote, setQuote] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const total = Math.round(shape.base * size.mult) + depth.add + picked.reduce((s, n) => s + (addons.find((a) => a.name === n)?.price ?? 0), 0);
  const togglePick = (n) => setPicked((p) => p.includes(n) ? p.filter((x) => x !== n) : [...p, n]);
  const generateQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/memory-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          story
        })
      });
      const resData = await res.json();
      const data = resData.success ? resData.data : resData;
      setQuote(data.quote || "");
    } catch {
      setQuote("Some flowers never fade, because the memories they hold never die.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPetals, { count: 10 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl px-6 py-20 text-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] uppercase text-gold mb-5", children: "The Soul Behind Every Piece" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Let Us Preserve Your Story." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl mx-auto text-muted-foreground", children: "From bridal bouquets to cherished mementos, we transform your fleeting moments into eternal pieces of art through the medium of liquid glass." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 py-12 grid lg:grid-cols-[1fr_360px] gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-8 w-8 rounded-full bg-gold text-primary-foreground text-sm", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Design Your Piece" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs tracking-wide font-medium", children: "Shape" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-2 gap-2", children: shapes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShape(s), className: `py-2 rounded text-xs transition border ${shape.name === s.name ? "bg-gold text-primary-foreground border-gold" : "border-border hover:border-gold"}`, children: s.name }, s.name)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs tracking-wide font-medium", children: "Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-2 gap-2", children: sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSize(s), className: `py-2 rounded text-xs transition border ${size.name === s.name ? "bg-gold text-primary-foreground border-gold" : "border-border hover:border-gold"}`, children: s.name }, s.name)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs tracking-wide font-medium", children: "Resin Depth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-4 gap-2", children: depthsList.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDepth(d), className: `py-2 rounded text-xs transition border ${depth.name === d.name ? "bg-gold text-primary-foreground border-gold" : "border-border hover:border-gold"}`, children: d.name }, d.name)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs tracking-wide font-medium", children: "Premium Add-ons" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid sm:grid-cols-2 gap-2", children: addons.map((a) => {
                const on = picked.includes(a.name);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => togglePick(a.name), className: `flex items-center justify-between p-3 rounded text-xs transition border ${on ? "border-gold bg-gold/5" : "border-border hover:border-gold/60"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-left", children: a.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold", children: [
                    "+",
                    formatINR(a.price)
                  ] })
                ] }, a.name);
              }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-8 w-8 rounded-full bg-gold text-primary-foreground text-sm", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Upload References" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border-2 border-dashed border-border hover:border-gold transition p-12 text-center bg-blush/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mx-auto h-7 w-7 text-gold mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Drag and drop or click to browse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG · up to 10MB" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryDate, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-8 w-8 rounded-full bg-gold text-primary-foreground text-sm", children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Your Story Matters" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Tell us the memory behind this artwork. Manjima reads every story personally." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: story, onChange: (e) => setStory(e.target.value), rows: 5, placeholder: "It was the bouquet from the day we said yes…", className: "w-full rounded-xl bg-blush/20 border border-border p-4 text-sm focus:outline-none focus:border-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: generateQuote, disabled: !story.trim() || loading, className: "mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs tracking-[0.2em] uppercase disabled:opacity-50 hover:bg-gold transition", children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            "Generate Memory Quote"
          ] }),
          quote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-6 rounded-xl bg-blush/40 border border-gold/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.3em] uppercase text-gold mb-2", children: "Your Memory Quote" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif italic text-xl leading-relaxed", children: [
              '"',
              quote,
              '"'
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:sticky lg:top-28 h-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.35em] uppercase text-gold mb-3", children: "Live Estimate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-5", children: "Your Commission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm border-y border-border py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Shape · ",
              shape.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(shape.base) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Size · ",
              size.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "×",
              size.mult
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Depth · ",
              depth.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "+",
              formatINR(depth.add)
            ] })
          ] }),
          picked.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between text-xs text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "+ ",
              n
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(addons.find((a) => a.name === n).price) })
          ] }, n))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex justify-between items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-gold", children: formatINR(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-6 w-full bg-gold text-primary-foreground rounded-full py-4 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition", children: "Submit Commission Inquiry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] text-muted-foreground text-center", children: "Manjima personally responds within 24 hours." })
      ] }) }) })
    ] })
  ] });
}
export {
  CustomPage as component
};
