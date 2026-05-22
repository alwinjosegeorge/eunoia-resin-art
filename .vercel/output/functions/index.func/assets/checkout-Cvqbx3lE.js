import { W as reactExports, a8 as useRouter, L as jsxRuntimeExports } from "./server-DAJe76I7.js";
import { e as createLucideIcon, b as Route, L as Link, a as MapPin } from "./router-JlluT2Qz.js";
import { S as ScrollReveal } from "./ScrollReveal-Cm5q-8aM.js";
import { p as pricingVariants } from "./products-C1BMDhgH.js";
import { S as ShieldCheck } from "./shield-check-BHavcAhI.js";
import { C as Check } from "./check-DfjNuiqL.js";
import { T as Truck } from "./truck-CQi_61KG.js";
import { U as Upload } from "./upload-BL0ZDunK.js";
import { A as ArrowLeft } from "./arrow-left-C-yh21Ic.js";
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
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
      key: "3pnvol"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  ["path", { d: "M12 10v12", key: "6ubwww" }],
  ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z", key: "9hd38g" }],
  ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z", key: "ufn41s" }]
];
const Flower2 = createLucideIcon("flower-2", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const steps = ["Memory Method", "Customer Details", "Delivery Address", "Confirmation"];
function CheckoutPage() {
  const search = Route.useSearch();
  const variantId = search.variantId || "5x5-frame";
  const depth = search.depth || "";
  const initialNotes = search.notes || "";
  const [dbProduct, setDbProduct] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (search.isDbProduct === "true") {
      fetch(`/api/products/${variantId}`).then((res) => res.json()).then((resData) => {
        const data = resData.success ? resData.data : resData;
        if (data && !data.error) {
          setDbProduct(data);
        }
      }).catch((err) => console.error("Error loading DB product in checkout:", err));
    }
  }, [variantId, search.isDbProduct]);
  const variant = pricingVariants.find((v) => v.id === variantId) || pricingVariants[0];
  const productName = dbProduct ? dbProduct.name : variant.name;
  const [preBookingKit, setPreBookingKit] = reactExports.useState(search.preBookingKit === "true");
  const basePrice = dbProduct ? Number(dbProduct.pricingMatrix?.find((r) => r.size === search.size && r.depth === depth)?.price) || Number(dbProduct.pricingMatrix?.[0]?.price) || 0 : search.price ? Number(search.price) : variant.depths ? variant.depths.find((d) => d.size === depth)?.price || 0 : variant.basePrice || 0;
  const price = basePrice + (preBookingKit ? 450 : 0);
  const [step, setStep] = reactExports.useState(0);
  const [submissionMethod, setSubmissionMethod] = reactExports.useState(search.submissionMethod || "");
  reactExports.useEffect(() => {
    if (submissionMethod === "upload") {
      setPreBookingKit(false);
    }
  }, [submissionMethod]);
  const [memoryItemsChecklist, setMemoryItemsChecklist] = reactExports.useState([]);
  const [otherMemoryItemsDetails, setOtherMemoryItemsDetails] = reactExports.useState("");
  const [customNotes, setCustomNotes] = reactExports.useState(initialNotes);
  const [personalization, setPersonalization] = reactExports.useState("");
  const [customer, setCustomer] = reactExports.useState({
    name: "",
    mobile: "",
    whatsapp: ""
  });
  const [address, setAddress] = reactExports.useState({
    house: "",
    area: "",
    landmark: "",
    district: "",
    state: "",
    pin: ""
  });
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [isSubmitted, setIsSubmitted] = reactExports.useState(false);
  const [submittedOrderId, setSubmittedOrderId] = reactExports.useState("");
  const [uploadedImage, setUploadedImage] = reactExports.useState("");
  const router = useRouter();
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large (maximum size is 2MB)");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const isStepValid = () => {
    if (step === 0) {
      return !!submissionMethod;
    }
    if (step === 1) {
      return customer.name.trim().length > 0 && customer.mobile.trim().replace(/\s+/g, "").length >= 10;
    }
    if (step === 2) {
      return address.house.trim().length > 0 && address.area.trim().length > 0 && address.district.trim().length > 0 && address.state.trim().length > 0 && address.pin.trim().replace(/\s+/g, "").length === 6;
    }
    return true;
  };
  const handleNext = () => {
    if (step < steps.length - 1 && isStepValid()) {
      setStep(step + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const handleBack = () => {
    if (step === 0) {
      router.history.back();
    } else {
      setStep(step - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const getExpectedCompletionDate = (daysToAdd) => {
    let count = 0;
    const currentDate = /* @__PURE__ */ new Date();
    while (count < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
    }
    return currentDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `ERA-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
      const expectedDate = getExpectedCompletionDate(30);
      const newOrder = {
        id: orderId,
        customerName: customer.name,
        customerPhone: customer.mobile,
        customerWhatsapp: customer.whatsapp,
        productName,
        depth: depth || "Standard",
        price,
        submissionMethod,
        checklist: memoryItemsChecklist,
        otherItemsDetails: otherMemoryItemsDetails,
        notes: customNotes || personalization,
        address,
        status: "Order Received",
        expectedCompletionDate: expectedDate,
        previewImage: uploadedImage,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        preBookingKit,
        kitPrice: preBookingKit ? 450 : 0,
        kitStatus: preBookingKit ? "Pending" : ""
      };
      fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
      }).then(async (mongoRes) => {
        if (!mongoRes.ok) {
          const errData = await mongoRes.json().catch(() => ({}));
          console.error("Failed to save order to MongoDB in background:", errData.error || mongoRes.statusText);
        } else {
          console.log("Successfully saved order to MongoDB in background");
        }
      }).catch((err) => {
        console.error("Failed to save order to MongoDB:", err);
      });
      const existingOrders = JSON.parse(localStorage.getItem("era_orders") || "[]");
      existingOrders.push(newOrder);
      localStorage.setItem("era_orders", JSON.stringify(existingOrders));
      const trackingLink = `https://eunoia-resin-art.vercel.app/track/${orderId}`;
      const whatsappMessage = `🌸 *New Eunoia Resin Art Order*

🆔 *Order ID:* ${orderId}

👤 *Customer:* ${customer.name}
📱 *Phone:* ${customer.mobile}

📦 *Product:*
${productName} ${depth ? `(${depth})` : ""}
${preBookingKit ? `🌸 *Pre-Booking Kit:* YES (+₹450)
⚠️ _Note: Customer requires a preservation starter kit before flower shipment._` : ""}

📝 *Notes:*
${customNotes || personalization || "None"}

🔗 *Track Order:*
${trackingLink}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      try {
        window.open(`https://wa.me/917591947287?text=${encodedMessage}`, "_blank");
      } catch (e) {
        console.error("Failed to open WhatsApp window:", e);
      }
      setSubmittedOrderId(orderId);
      setIsSubmitted(true);
      setIsProcessing(false);
    }, 1500);
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-2xl px-6 py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-8 md:p-12 space-y-8 border border-gold/30 bg-gradient-to-b from-gold/5 via-transparent to-transparent shadow-lg shadow-gold/5 animate-in fade-in slide-in-from-bottom-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto h-20 w-20 bg-gold/10 rounded-full flex items-center justify-center border border-gold/40 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gold/10 rounded-full animate-ping opacity-75 animate-duration-1000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10 text-gold" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.6em] uppercase text-gold font-semibold", children: "Commission Initialized" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl", children: "Order Successfully Placed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm max-w-md mx-auto leading-relaxed", children: [
          "Thank you, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: customer.name }),
          ". We have saved your custom resin art order and generated a unique tracking ID."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/40 rounded-2xl p-6 border border-border space-y-4 max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b border-border pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tracking-wider uppercase", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-gold font-semibold text-sm tracking-wide", children: submittedOrderId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-right", children: [
            productName,
            " ",
            depth ? `(${depth})` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Submission Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium capitalize", children: submissionMethod === "ship" ? "Ship Real Flowers" : "Upload Images Only" })
        ] }),
        preBookingKit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-t border-border/40 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Pre-Booking Kit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gold", children: "YES (+₹450)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-display text-gold", children: [
            "Rs. ",
            price.toLocaleString("en-IN")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-gold/5 border border-gold/20 text-xs text-muted-foreground leading-relaxed max-w-md mx-auto space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "💬 WhatsApp Payment Setup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Please open the WhatsApp chat with our artist ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Manjima" }),
          " using the button below to complete payment setup and confirm your design notes."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 justify-center pt-4 max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/917591947287?text=${encodeURIComponent(`🌸 *New Eunoia Resin Art Order*

🆔 *Order ID:* ${submittedOrderId}
👤 *Customer:* ${customer.name}
📱 *Phone:* ${customer.mobile}
📦 *Product:* ${productName} ${depth ? `(${depth})` : ""}${preBookingKit ? `
🌸 *Pre-Booking Kit:* YES (+₹450)
⚠️ _Note: Customer requires a preservation starter kit before flower shipment._` : ""}
🔗 *Track Order:* https://eunoia-resin-art.vercel.app/track/${submittedOrderId}`)}`, target: "_blank", rel: "noreferrer", className: "w-full inline-flex justify-center items-center px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold hover:scale-[1.01] shadow-lg transition-all", children: "💬 Confirm & Order via WhatsApp →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex-1 inline-flex justify-center items-center px-6 py-3.5 border border-border rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-secondary transition font-medium", children: "Back to Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/track/${submittedOrderId}`, className: "flex-1 inline-flex justify-center items-center px-6 py-3.5 bg-gold text-primary-foreground rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold hover:opacity-90 shadow-gold transition-all", children: "Track Live Progress →" })
        ] })
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 pt-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] uppercase text-gold mb-4", children: "Secure Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "Complete Your Commission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 italic font-serif text-muted-foreground", children: "“I’m placing a handcrafted memory preservation order.”" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 md:gap-4 mb-12 flex-wrap", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => i < step && setStep(i), className: "flex items-center gap-2 group outline-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid place-items-center h-7 w-7 md:h-8 md:w-8 rounded-full text-xs font-medium transition-all duration-300 ${i < step ? "bg-gold text-primary-foreground shadow-gold" : i === step ? "border-2 border-gold text-gold scale-110" : "border border-border text-muted-foreground"}`, children: i < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `hidden md:block text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors ${i === step ? "text-gold font-semibold" : i < step ? "text-foreground" : "text-muted-foreground"}`, children: s })
      ] }),
      i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-4 md:w-8 h-[1px] ${i < step ? "bg-gold" : "bg-border"}` })
    ] }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: "How would you like to share your memories?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSubmissionMethod("ship"), className: `text-left p-6 rounded-xl border-2 transition-all ${submissionMethod === "ship" ? "border-gold bg-gold/5 shadow-soft" : "border-border hover:border-gold/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flower2, { className: `h-8 w-8 mb-4 ${submissionMethod === "ship" ? "text-gold" : "text-muted-foreground"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-lg mb-2", children: "Ship Real Flowers/Bouquet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Perfect for wedding bouquet preservation and real flower keepsakes." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSubmissionMethod("upload"), className: `text-left p-6 rounded-xl border-2 transition-all ${submissionMethod === "upload" ? "border-gold bg-gold/5 shadow-soft" : "border-border hover:border-gold/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: `h-8 w-8 mb-4 ${submissionMethod === "upload" ? "text-gold" : "text-muted-foreground"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-lg mb-2", children: "Upload Images Only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Ideal for photo-based resin artworks and custom memory designs." })
          ] })
        ] }),
        submissionMethod === "ship" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-top-4 duration-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl bg-secondary/50 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-gold" }),
              " Studio Address"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-4 rounded-lg border border-border text-sm font-mono leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Manjima (Eunoia Resin Art)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Jayanthi Nivas (H)",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Mukkam PO",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Calicut – 673602",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Phone: +91 7591947287"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl bg-[#f5f0e6] border border-[#e8dfc8]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium flex items-center gap-2 mb-2 text-amber-900", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4" }),
              " Recommended Courier"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-800/80 mb-2", children: [
              "We recommend ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "DTDC" }),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "BlueDart" }),
              ", or other professional courier services."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-800/80 mb-2", children: [
              "Please avoid: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Regular Post Office Shipping" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800/60 italic mt-3", children: "Reason: Delicate flower preservation orders require careful handling — professional couriers ensure safe delivery." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in duration-300", children: [
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-widest uppercase text-muted-foreground font-semibold block mb-2", children: "Included in kit:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1.5", children: "✦ 1kg Silica Gel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1.5", children: "✦ Protective Gloves" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1.5", children: "✦ Airtight Container" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1.5", children: "✦ Instruction Card" })
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl bg-amber-50/50 border border-amber-200/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium flex items-center gap-2 mb-3 text-amber-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
              " Important Packaging Note"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-900/80 mb-3", children: "Please write this clearly outside your parcel:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold tracking-wider text-center border border-amber-200 uppercase", children: "FRAGILE • DRIED FLOWERS • HANDLE WITH CARE • DO NOT CRUSH" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1", children: "Items Included In Your Package" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70 mb-4", children: "This helps us verify all memory items once your courier reaches our studio. (Not for upload)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: ["Wedding Flowers / Bouquet", "Thali / Minnu Included", "Rings Included", "Invitation Card Included", "Photos Included", "Other Memory Items"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${memoryItemsChecklist.includes(item) ? "border-gold bg-gold/5" : "border-border hover:border-gold/30 bg-secondary/20"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-0.5 h-4 w-4 rounded border flex items-center justify-center ${memoryItemsChecklist.includes(item) ? "border-gold bg-gold text-primary-foreground" : "border-muted-foreground/50"}`, children: memoryItemsChecklist.includes(item) && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium leading-none", children: item }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "sr-only", checked: memoryItemsChecklist.includes(item), onChange: (e) => {
                  if (e.target.checked) {
                    setMemoryItemsChecklist([...memoryItemsChecklist, item]);
                  } else {
                    setMemoryItemsChecklist(memoryItemsChecklist.filter((i) => i !== item));
                  }
                } })
              ] }, item)) })
            ] }),
            memoryItemsChecklist.includes("Other Memory Items") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-top-2 duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium block", children: "What else are you sending?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: otherMemoryItemsDetails, onChange: (e) => setOtherMemoryItemsDetails(e.target.value), rows: 2, className: "mt-2 w-full bg-secondary/30 border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-gold transition-colors", placeholder: "Tell us what else you're sending..." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium", children: "Special Instructions / Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: customNotes, onChange: (e) => setCustomNotes(e.target.value), rows: 3, className: "mt-2 w-full bg-secondary/30 border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-gold transition-colors", placeholder: "e.g. 'Use gold accents', 'Minimal design', 'Add names and date'" })
            ] })
          ] })
        ] }),
        submissionMethod === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-top-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", id: "checkout-image-upload", className: "hidden", onChange: handleImageUpload }),
          uploadedImage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-gold/40 bg-gold/5 p-6 flex flex-col items-center justify-center space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gold uppercase tracking-widest font-semibold flex items-center gap-1.5 animate-pulse", children: "✦ Image Selected Successfully" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-40 w-40 rounded-xl overflow-hidden border border-border shadow-soft bg-secondary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: uploadedImage, alt: "Uploaded reference memory", className: "w-full h-full object-cover animate-in zoom-in-95 duration-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setUploadedImage(""), className: "px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs rounded-full font-medium transition active:scale-95", children: "Remove & Upload Different Image" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "checkout-image-upload", className: "rounded-xl border-2 border-dashed border-border hover:border-gold p-6 text-center transition cursor-pointer bg-secondary/20 hover:bg-gold/5 flex flex-col items-center justify-center group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mx-auto h-6 w-6 text-gold mb-2 group-hover:scale-110 transition duration-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium", children: "Upload Memory Photos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/60 mt-1", children: "Select PNG, JPG (Max 2MB)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "checkout-image-upload", className: "rounded-xl border-2 border-dashed border-border hover:border-gold p-6 text-center transition cursor-pointer bg-secondary/20 hover:bg-gold/5 flex flex-col items-center justify-center group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mx-auto h-6 w-6 text-gold mb-2 group-hover:scale-110 transition duration-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium", children: "Upload Reference Images" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/60 mt-1", children: "Select PNG, JPG (Max 2MB)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium", children: "Names / Date / Quote" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: personalization, onChange: (e) => setPersonalization(e.target.value), className: "mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors", placeholder: "e.g. Arun ❤️ Sarangi, 30/11/2025" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium", children: "Special Instructions / Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: customNotes, onChange: (e) => setCustomNotes(e.target.value), rows: 3, className: "mt-2 w-full bg-secondary/30 border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-gold transition-colors", placeholder: "Any specific design requests..." })
            ] })
          ] })
        ] })
      ] }) }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6 text-gold" }),
          " Customer Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium flex items-center gap-1", children: [
              "Full Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customer.name, onChange: (e) => setCustomer({
              ...customer,
              name: e.target.value
            }), className: "mt-2 w-full bg-transparent border-b border-border py-3 text-base focus:border-gold outline-none transition-colors", placeholder: "Enter your full name" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium flex items-center gap-1", children: [
              "Mobile Number ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customer.mobile, onChange: (e) => setCustomer({
              ...customer,
              mobile: e.target.value
            }), type: "tel", className: "mt-2 w-full bg-transparent border-b border-border py-3 text-base focus:border-gold outline-none transition-colors", placeholder: "e.g. +91 9876543210 (Minimum 10 digits)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium", children: "WhatsApp Number (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customer.whatsapp, onChange: (e) => setCustomer({
              ...customer,
              whatsapp: e.target.value
            }), type: "tel", className: "mt-2 w-full bg-transparent border-b border-border py-3 text-base focus:border-gold outline-none transition-colors", placeholder: "If different from mobile" })
          ] })
        ] })
      ] }) }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-6 w-6 text-gold" }),
          " Delivery Address"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-x-5 gap-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium flex items-center gap-1", children: [
              "House Name / Flat ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: address.house, onChange: (e) => setAddress({
              ...address,
              house: e.target.value
            }), className: "mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors", placeholder: "e.g. Rose Villa, Apt 4B" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium flex items-center gap-1", children: [
              "Area / Street ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: address.area, onChange: (e) => setAddress({
              ...address,
              area: e.target.value
            }), className: "mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors", placeholder: "Street name, neighborhood" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium", children: "Landmark (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: address.landmark, onChange: (e) => setAddress({
              ...address,
              landmark: e.target.value
            }), className: "mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors", placeholder: "Near post office" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium flex items-center gap-1", children: [
              "District / City ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: address.district, onChange: (e) => setAddress({
              ...address,
              district: e.target.value
            }), className: "mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors", placeholder: "District" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium flex items-center gap-1", children: [
              "State ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: address.state, onChange: (e) => setAddress({
              ...address,
              state: e.target.value
            }), className: "mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors", placeholder: "State" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium flex items-center gap-1", children: [
              "PIN Code ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: address.pin, onChange: (e) => setAddress({
              ...address,
              pin: e.target.value
            }), className: "mt-2 w-full bg-transparent border-b border-border py-2 text-sm focus:border-gold outline-none transition-colors", placeholder: "e.g. 673602 (Exactly 6 digits)" })
          ] })
        ] })
      ] }) }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6 text-gold" }),
          " Order Confirmation"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/20 rounded-xl p-5 space-y-4 text-sm border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg border-b border-border pb-2", children: "Order Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-right", children: [
              productName,
              " ",
              depth ? `(${depth})` : ""
            ] })
          ] }),
          search.size && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: search.size })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Submission Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: submissionMethod === "ship" ? "Ship Real Flowers" : "Upload Images Only" })
          ] }),
          preBookingKit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1 border-t border-border/40 mt-1.5 pt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Pre-Booking Kit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gold", children: "YES (+₹450)" })
          ] }),
          uploadedImage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1.5 border-t border-border/40 mt-1.5 pt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Uploaded Photo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg overflow-hidden border border-border bg-secondary/20 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: uploadedImage, alt: "Uploaded design reference", className: "w-full h-full object-cover" }) })
          ] }),
          submissionMethod === "ship" && memoryItemsChecklist.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col py-1.5 border-t border-border/40 mt-1.5 pt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs mb-1", children: "Items Included in Parcel:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm font-medium space-y-0.5", children: memoryItemsChecklist.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-gold" }),
              " ",
              item,
              item === "Other Memory Items" && otherMemoryItemsDetails ? ` - ${otherMemoryItemsDetails}` : ""
            ] }, item)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1 border-t border-border pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-medium", children: "Total Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold font-display text-xl", children: [
              "Rs. ",
              price.toLocaleString("en-IN")
            ] })
          ] })
        ] }),
        preBookingKit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl border border-gold/30 p-5 bg-gradient-to-br from-[#f5f0e6]/25 to-transparent space-y-3 animate-in fade-in slide-in-from-top-2 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flower2, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-sm font-semibold", children: "🌸 Pre-Booking Kit Included" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: "We will ship a professional flower preservation starter kit to your delivery address. This kit helps reduce flower discoloration, moisture damage, and petal decay before your memories safely reach our studio." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 pt-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] tracking-widest uppercase text-muted-foreground font-semibold block mb-1.5", children: "What's coming in your kit:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-muted-foreground/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1", children: "✦ 1kg Silica Gel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1", children: "✦ Protective Gloves" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1", children: "✦ Airtight Container" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1", children: "✦ Instruction Card" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-gold/80 italic pt-1 border-t border-border/10", children: "🚚 Your kit will be packed and shipped shortly after payment confirmation." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/20 rounded-xl p-5 space-y-3 text-sm border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg border-b border-border pb-2", children: "Contact & Delivery Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium block", children: "Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: customer.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium block", children: "Contact Info" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                customer.mobile,
                " ",
                customer.whatsapp && `(WA: ${customer.whatsapp})`
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium block", children: "Delivery Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/80 leading-relaxed mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: address.house }),
                ", ",
                address.area,
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                address.landmark ? `${address.landmark}, ` : "",
                address.district,
                ", ",
                address.state,
                " - ",
                address.pin
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleBack, className: "flex-1 inline-flex justify-center items-center gap-2 px-6 py-4 border border-border rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-secondary hover:border-gold transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            " Back"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handlePayment, disabled: isProcessing, className: "flex-[2] py-4 bg-gold text-primary-foreground rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold hover:opacity-90 hover:scale-[1.01] shadow-gold transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2", children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Processing Order..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Confirm & Order via WhatsApp →" }) })
        ] })
      ] }) }),
      step < 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleBack, className: "inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-secondary hover:border-gold transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          " Back"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleNext, disabled: !isStepValid(), className: "px-8 py-3 bg-gold text-primary-foreground rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase hover:opacity-90 hover:scale-[1.02] shadow-gold transition-all disabled:opacity-50 disabled:pointer-events-none", children: "Continue →" })
      ] })
    ] }) })
  ] });
}
export {
  CheckoutPage as component
};
