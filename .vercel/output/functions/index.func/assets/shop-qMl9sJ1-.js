import { W as reactExports, L as jsxRuntimeExports } from "./server-DAJe76I7.js";
import { L as Link, S as Search, P as Package } from "./router-JlluT2Qz.js";
import { f as formatINR, a as products } from "./products-C1BMDhgH.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { S as Sparkles } from "./sparkles-D7CLvB__.js";
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
const cats = ["All Pieces", "Teak Wood Frames", "Hoop Collection", "Hexagon Deepcast", "Coasters", "Trays"];
function ShopPage() {
  const [cat, setCat] = reactExports.useState("All Pieces");
  const [dbProducts, setDbProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchQuery, setSearchQuery] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    return "";
  });
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleUrlChange = () => {
        const params = new URLSearchParams(window.location.search);
        const urlQuery = params.get("q") || params.get("search") || "";
        if (urlQuery !== searchQuery) {
          setSearchQuery(urlQuery);
        }
      };
      window.addEventListener("popstate", handleUrlChange);
      const interval = setInterval(handleUrlChange, 200);
      return () => {
        window.removeEventListener("popstate", handleUrlChange);
        clearInterval(interval);
      };
    }
  }, [searchQuery]);
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
            // Fallback image if not uploaded yet
            hoverImage: p.hoverImage,
            // Map hoverImage
            badge: p.badge,
            description: p.description
          }));
          setDbProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to load products from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);
  const displayProducts = dbProducts;
  const list = reactExports.useMemo(() => {
    let filtered = displayProducts;
    if (cat !== "All Pieces") {
      filtered = filtered.filter((p) => p.category === cat);
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.category && p.category.toLowerCase().includes(q) || p.description && p.description.toLowerCase().includes(q));
    }
    return filtered;
  }, [cat, searchQuery, displayProducts]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] text-gold uppercase mb-4", children: "Curated Atelier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Our Handcrafted Collections" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground", children: "Discover the ethereal beauty of liquid art preserved in wood. Each piece is a soulful journey of raw materials meeting refined craftsmanship." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[260px_1fr] gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-8 animate-in fade-in duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] tracking-[0.35em] uppercase text-gold mb-4 border-b border-border pb-3", children: "Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCat(c), className: `text-sm transition ${cat === c ? "text-gold font-medium" : "text-foreground/70 hover:text-gold"}`, children: [
            cat === c && "• ",
            c
          ] }) }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-xl mt-3", children: "Bespoke Art" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Want something uniquely yours? Start your custom commission." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/custom", className: "mt-4 block text-center border border-gold text-gold rounded-full px-4 py-2 text-[11px] tracking-[0.25em] uppercase hover:bg-gold hover:text-primary-foreground transition", children: "Request Custom" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-secondary/10 border border-border/40 rounded-2xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: list.length }),
            " pieces in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gold", children: cat })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center bg-background border border-border/60 rounded-full px-4 py-2 w-full sm:max-w-xs shadow-sm hover:border-gold/45 focus-within:border-gold transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground mr-2 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search products...", value: searchQuery, onChange: (e) => {
              setSearchQuery(e.target.value);
              if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                if (e.target.value) {
                  url.searchParams.set("q", e.target.value);
                } else {
                  url.searchParams.delete("q");
                }
                window.history.replaceState({}, "", url.toString());
              }
            }, className: "bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 w-full outline-none" }),
            searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setSearchQuery("");
              if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                url.searchParams.delete("q");
                window.history.replaceState({}, "", url.toString());
              }
            }, className: "text-[10px] text-muted-foreground hover:text-foreground font-semibold ml-1.5 shrink-0", children: "Clear" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: loading ? Array.from({
          length: 6
        }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl aspect-[4/5] bg-secondary/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-12 bg-secondary/70 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-28 bg-secondary/70 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 bg-secondary/70 rounded" })
          ] })
        ] }, idx)) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full text-center py-20 bg-secondary/10 rounded-2xl border border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No pieces found matching your criteria." })
        ] }) : list.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$id", params: {
          id: p.id
        }, className: "block group hover-lift", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl aspect-[4/5] bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, loading: "lazy", className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" }),
            p.hoverImage && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.hoverImage, alt: `${p.name} Alternate`, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" }),
            p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 bg-foreground text-background text-[9px] tracking-[0.25em] uppercase px-2 py-1 rounded z-10", children: p.badge })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] tracking-[0.3em] uppercase text-muted-foreground", children: p.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg mt-1", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gold text-sm mt-1", children: formatINR(p.price) })
          ] })
        ] }) }, p.id)) })
      ] })
    ] })
  ] });
}
export {
  ShopPage as component
};
