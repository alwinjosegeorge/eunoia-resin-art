import { L as jsxRuntimeExports } from "./server-DAJe76I7.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { e as createLucideIcon, a as MapPin, M as Mail } from "./router-JlluT2Qz.js";
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
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function ContactPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] uppercase text-gold mb-4", children: "Get In Touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Let's Start Your Commission." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground max-w-xl mx-auto", children: "A boutique commission begins with a conversation. Tell us what you'd like to preserve." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 glass-card rounded-2xl p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[10px] tracking-[0.35em] uppercase text-muted-foreground", children: "Visit The Studio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm", children: [
            "Jayanthi Nivas (H), Mukkam (PO),",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Calicut – 673602, Kerala"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[10px] tracking-[0.35em] uppercase text-muted-foreground", children: "Direct Line" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+917591947287", className: "mt-1 block text-sm hover:text-gold", children: "+91 7591 947 287" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[10px] tracking-[0.35em] uppercase text-muted-foreground", children: "Email Enquiries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@eunoiaresin.art", className: "mt-1 block text-sm hover:text-gold", children: "hello@eunoiaresin.art" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "glass-card rounded-2xl p-8 space-y-5", onSubmit: (e) => e.preventDefault(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.3em] uppercase text-muted-foreground", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none", placeholder: "Aditi Sharma" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.3em] uppercase text-muted-foreground", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", className: "mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none", placeholder: "hello@example.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.3em] uppercase text-muted-foreground", children: "Enquiry Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Custom Home Decor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Wedding Bouquet Preservation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Baby Keepsake" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Memorial Tribute" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.3em] uppercase text-muted-foreground", children: "Your Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 6, className: "mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none resize-none", placeholder: "Tell us about your dream piece…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full bg-gold text-primary-foreground rounded-full py-3.5 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition", children: "Send Message" })
      ] }) })
    ] })
  ] });
}
export {
  ContactPage as component
};
