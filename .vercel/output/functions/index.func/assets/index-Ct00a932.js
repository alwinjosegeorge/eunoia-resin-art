import { L as jsxRuntimeExports, W as reactExports } from "./server-DAJe76I7.js";
import { e as createLucideIcon, L as Link } from "./router-JlluT2Qz.js";
import { f as formatINR, a as products } from "./products-C1BMDhgH.js";
import { F as FloatingPetals } from "./FloatingPetals-CENI_17F.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { H as Heart } from "./heart-BSJN8Kdr.js";
import { T as Truck } from "./truck-CQi_61KG.js";
import { S as Sparkles } from "./sparkles-D7CLvB__.js";
import { B as BeforeAfter } from "./BeforeAfter-BJK8KrXV.js";
import { C as ChevronLeft, a as ChevronRight } from "./chevron-right-BXp7_LEW.js";
import { A as ArrowRight } from "./arrow-right-0CiJ48Oi.js";
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
const __iconNode$3 = [
  ["path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6", key: "b3dvk1" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
      key: "7w4byz"
    }
  ],
  ["path", { d: "M2 9h20", key: "16fsjt" }]
];
const Gem = createLucideIcon("gem", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8", key: "18ogeb" }]
];
const Infinity = createLucideIcon("infinity", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
const Quote = createLucideIcon("quote", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const hero = "/assets/hero-bouquet-zkFVdBWU.jpeg";
const prebooking = "/assets/prebooking-lbNLSCfM.png";
const items = [
  { icon: Heart, label: "Handmade with care" },
  { icon: Truck, label: "Shipping included" },
  { icon: Shield, label: "Safe fragile packaging" },
  { icon: Sparkles, label: "Fully customised" },
  { icon: Gem, label: "Premium resin quality" },
  { icon: Infinity, label: "Long-lasting preservation" }
];
function TrustStrip() {
  const loop = [...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-y border-border/60 bg-secondary/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-track flex gap-14 py-5 whitespace-nowrap", children: loop.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-foreground/70", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-4 w-4 text-gold" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-wide", children: it.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "✦" })
  ] }, i)) }) });
}
const testimonials = [
  {
    text: "Opening the package felt truly emotional. Every detail was preserved beautifully, turning our wedding memories into something timeless.",
    name: "Alwin Jose George",
    role: "Wedding Memory Preservation Client",
    location: "Poonjar"
  },
  {
    text: "The quality and presentation are absolutely premium. From the handcrafted finish to the emotional detailing, everything felt personal and meaningful. Truly one of the best custom gifting experiences.",
    name: "Joe Martin",
    role: "Premium Keepsake Collection Client",
    location: "Kottayam"
  },
  {
    text: "The moment I opened the package, I was speechless. Every flower, every detail, and every memory was preserved with so much care and elegance. It feels more like a luxury keepsake than just resin art.",
    name: "Nikkita Anna George",
    role: "Custom Floral Resin Art Client",
    location: "Kochi"
  },
  {
    text: "Beautifully handcrafted and professionally finished. The attention to detail, premium packaging, and overall experience were exceptional. Eunoia Resin Art creates memories that genuinely last forever.",
    name: "Luqmanul Hakim",
    role: "Luxury Resin Art Collection Client",
    location: "Malappuram"
  },
  {
    text: "I never imagined flowers could be preserved this beautifully. The final artwork looked elegant, emotional, and luxurious. You can genuinely feel the love and effort behind every piece.",
    name: "Anna Shibu",
    role: "Bridal Bouquet Preservation Client",
    location: "Thrissur"
  }
];
function TestimonialCarousel() {
  const [active, setActive] = reactExports.useState(0);
  const [visible, setVisible] = reactExports.useState(true);
  const INTERVAL = 5e3;
  const goTo = reactExports.useCallback(
    (index) => {
      setVisible(false);
      setTimeout(() => {
        setActive((index + testimonials.length) % testimonials.length);
        setVisible(true);
      }, 400);
    },
    []
  );
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      goTo(active + 1);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [active, goTo]);
  const t = testimonials[active];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-6 py-14 text-center select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-5 w-5 text-gold" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          transition: "opacity 0.6s cubic-bezier(.4,0,.2,1), filter 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)",
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : "blur(4px)",
          transform: visible ? "translateY(0)" : "translateY(8px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif italic text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground max-w-3xl mx-auto", children: [
            '"',
            t.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.4em] uppercase text-gold font-medium", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              t.role,
              " · ",
              t.location
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center justify-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => goTo(active - 1),
          className: "h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all opacity-50 hover:opacity-100",
          "aria-label": "Previous review",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: testimonials.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => goTo(i),
          "aria-label": `Review ${i + 1}`,
          className: "transition-all duration-500",
          style: {
            width: i === active ? "24px" : "8px",
            height: "8px",
            borderRadius: "9999px",
            background: i === active ? "var(--gold)" : "var(--border)",
            opacity: i === active ? 1 : 0.5
          }
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => goTo(active + 1),
          className: "h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all opacity-50 hover:opacity-100",
          "aria-label": "Next review",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function HomePage() {
  const [dbProducts, setDbProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const resData = await res.json();
          const data = resData.success ? resData.data : resData;
          const activeOnly = data.filter((p) => {
            const s = p.status?.toLowerCase();
            return s === "active" || s === "featured" || !p.status;
          });
          const mapped = activeOnly.map((p) => ({
            id: p.id,
            name: p.name,
            tagline: p.subtitle || p.category,
            category: p.category,
            price: Number(p.pricingMatrix?.[0]?.price) || Number(p.previewPrice) || 0,
            image: p.image || products[0].image,
            hoverImage: p.hoverImage,
            badge: p.badge,
            description: p.description
          }));
          setDbProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to load products from database for homepage:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);
  const displayProducts = dbProducts;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPetals, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 pt-0 pb-10 grid lg:grid-cols-12 gap-12 items-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] text-gold uppercase mb-6", children: "✦ A Boutique Atelier in Kerala ✦" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-charcoal", children: [
            "Preserving Your ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "font-serif italic shimmer-text", children: "Precious Memories" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Forever."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-7 max-w-md text-base leading-relaxed text-muted-foreground", children: "Bridal bouquets. Baby keepsakes. The flowers from the night they said yes. We transform fleeting beauty into heirlooms cast in crystal resin and champagne gold." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-9 flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.18em] uppercase hover:bg-gold transition-all", children: [
              "Explore Collection",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/917591947287", target: "_blank", rel: "noopener noreferrer", className: "text-sm tracking-[0.18em] uppercase border-b border-gold pb-1 text-foreground hover:text-gold transition", children: "Chat on WhatsApp" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex items-center gap-6 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-gold" }),
              " Handcrafted in Calicut"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5 text-gold" }),
              " Trusted by 1,200+ couples"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-6 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-8 bg-gradient-to-br from-blush/60 via-transparent to-gold-light/30 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hero, alt: "Handcrafted resin art with preserved pink roses and gold leaf", width: 1600, height: 1200, className: "relative rounded-2xl shadow-soft w-full aspect-square object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-6 -left-6 glass-card rounded-xl px-5 py-3 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif italic text-sm", children: "Handcrafted with soul." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.3em] text-gold uppercase mt-1", children: "— Manjima" })
          ] })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrustStrip, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] text-gold uppercase mb-4", children: "Curated Series" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl", children: "Signature Collections" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-divider mx-auto w-24 mt-6" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: loading ? Array.from({
        length: 3
      }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse rounded-2xl aspect-[4/5] bg-secondary/50" }, idx)) : displayProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center py-10 bg-secondary/10 rounded-2xl border border-border/40 text-muted-foreground text-sm", children: "No signature collections added yet." }) : displayProducts.slice(0, 3).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 120, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: {
        id: p.id
      }, className: "block group hover-lift", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, loading: "lazy", className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/80 mt-1", children: p.tagline })
        ] })
      ] }) }) }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] text-gold uppercase mb-3", children: "Most Loved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl", children: "Gallery Best Sellers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hidden md:inline-block text-sm tracking-[0.2em] uppercase border-b border-gold pb-1 hover:text-gold", children: "View all →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: loading ? Array.from({
        length: 4
      }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl aspect-square bg-secondary/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-28 bg-secondary/70 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 bg-secondary/70 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-12 bg-secondary/70 rounded" })
        ] })
      ] }, idx)) : displayProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center py-10 bg-secondary/10 rounded-2xl border border-border/40 text-muted-foreground text-sm", children: "No products available in the gallery." }) : displayProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$id", params: {
        id: p.id
      }, className: "block group hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl aspect-square bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, loading: "lazy", className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" }),
          p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 bg-foreground text-background text-[9px] tracking-[0.25em] uppercase px-2 py-1 rounded", children: p.badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gold text-sm mt-1", children: formatINR(p.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground border-t border-border pt-3 group-hover:text-gold", children: "View Piece" })
        ] })
      ] }) }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-14 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] text-gold uppercase mb-4", children: "The Transformation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl leading-tight", children: [
          "From fresh bloom to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "font-serif italic", children: "eternal heirloom" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground leading-relaxed", children: "Drag the slider to witness the alchemy. Every petal you see was once held by a bride, a mother, a beloved. Now it lives forever — suspended in crystal, framed in gold." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-6", children: [["32–45", "Days of careful preservation"], ["100%", "Hand-poured, never machine made"]].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-gold", children: k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: v })
        ] }, k)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfter, {}) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-[2.5rem] p-8 md:p-14 border border-gold/30 bg-gradient-to-br from-[#f5f0e6]/40 via-transparent to-gold/5 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-gold-light/10 blur-[100px] rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-20 -left-20 w-80 h-80 bg-blush/20 blur-[100px] rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-6 order-2 lg:order-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-gold/10 text-gold px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-bold border border-gold/25", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Luxury Safety Pre-Booking"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl leading-tight text-charcoal", children: [
            "Preserve Before ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "You ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif italic shimmer-text", children: "Ship" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-xl", children: "Pre-book our flower preservation safety kit for upcoming weddings and special memories. Protect your bridal bouquet immediately and reduce flower discoloration, moisture damage, and petal decay before your memories safely reach our Calicut studio." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-[#f5f0e6]/70 border border-gold/20 text-xs text-[#8f6d23] leading-relaxed max-w-xl animate-in fade-in slide-in-from-top-2 duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5", children: "🌸 Why This Kit Helps" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This preservation kit helps reduce flower discoloration, moisture damage, and petal decay before your memories safely reach our studio. The ₹450 kit is professional preservation care — not just an add-on." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/checkout", search: {
            variantId: "5x5-frame",
            preBookingKit: "true",
            submissionMethod: "ship"
          }, className: "group inline-flex items-center gap-3 bg-[#c9a14a] hover:bg-[#b08b3e] text-white px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-bold transition-all shadow-[0_4px_15px_rgba(201,161,74,0.25)] hover:scale-[1.01]", children: [
            "Reserve Preservation Kit",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5 order-1 lg:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: prebooking, alt: "Luxury Flower Preservation Pre-Booking Kit — Silica Gel, Gloves, Airtight Container", className: "w-full object-cover shadow-soft border border-gold/20", style: {
          minHeight: "520px",
          objectFit: "cover",
          borderRadius: "32px",
          transition: "transform 0.5s ease"
        }, onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.01)", onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialCarousel, {})
  ] });
}
export {
  HomePage as component
};
