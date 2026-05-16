
# Eunoia Resin Art — Luxury Brand Transformation Plan

This is a large multi-page build. I'll deliver it in **3 phases** so you can review progress and steer mid-flight. Each phase produces a working, beautiful site — we just keep layering depth.

---

## Phase 1 — Foundation & Core Luxury Experience

**Design system & global feel**
- Premium typography: Playfair Display (display) + Cormorant Garamond (serif accent) + Poppins (body)
- Refined palette: ivory `#FBF8F3`, champagne gold `#C9A14A`, deep charcoal, soft blush
- Glassmorphism navbar (transparent + blur, gold accents)
- Floating petal animation (subtle, drifting across hero sections)
- Golden glow cursor hover effect
- Premium loader screen (blooming flower + logo reveal on first load)
- Cinematic scroll reveals (fade + blur + scale + parallax via Intersection Observer + Motion)
- Floating WhatsApp consultation button

**Core pages (separate routes, SSR + SEO)**
- `/` Home — hero, signature collections, philosophy, best sellers, gallery, testimonials, trust strip
- `/shop` Shop All — collections grid with filters
- `/product/$id` Product Detail with **Live Customization Preview** (frame/depth/colors/shape → live mockup)
- `/custom` Custom Order — multi-step preservation flow
- `/about` Our Story
- `/contact` Contact

---

## Phase 2 — Emotional Storytelling Features

- **Memory Timeline**: date picker (wedding / baby / anniversary / proposal) → elegant "Your memory preserved from June 12, 2025 ❤️" display
- **Before → After Slider**: interactive drag slider (fresh bouquet ↔ resin artwork)
- **Luxury Packaging Experience** section: satin ribbon, gold seal, fragile handling, handwritten note, gift box
- **"Your Story Matters"** textarea stored with order
- **AI-Generated Memory Quote** (via Lovable AI Gateway — `google/gemini-2.5-flash`) producing emotional quotes from the user's memory text
- **Order Journey Tracker** (6-step elegant progress: Confirmed → Designing → Curing → Polishing → Packed → Shipped)
- **Custom Resin Calculator** (shape + size + depth + add-ons → live total)
- **Wedding Bouquet Preservation** dedicated page
- **Premium FAQ** with glassmorphism accordion

---

## Phase 3 — Checkout, Audio & Premium Sections

- **Multi-Step Luxury Checkout** (Product → Upload Memories → Personalization → Payment review)
- **Emotional Music Ambience**: soft piano loop with elegant mute/unmute toggle (royalty-free track, autoplay off until user opts in)
- **Premium content sections**: Why Resin Art Matters, How We Preserve, Handmade Process, Customer Memory Stories, Trusted By Hundreds, Packaging Experience, Behind The Art
- **Trust strip** everywhere: handmade with care, shipping included, safe packaging, fully customized, premium resin, long-lasting
- Emotional CTAs throughout: "Preserve Your Forever", "Turn Memories Into Art", "Book Your Custom Piece", "Crafted To Last Forever"
- Mobile polish: smooth gestures, floating cards, rich animations

---

## Technical Details

- **Stack**: TanStack Start (already set up) + Tailwind v4 + Motion for React + shadcn
- **Images**: generate hero/section/product imagery via imagegen (resin art, bouquets, packaging) — saved to `src/assets/`
- **State**: local state for customization preview, cart, checkout steps; persisted in localStorage for now
- **AI quotes**: Lovable AI Gateway server function (no extra setup needed if Cloud is enabled — I'll enable Cloud if not already)
- **Audio**: small royalty-free piano loop in `/public/audio/`
- **No backend persistence** in this pass (orders/forms are demo state). Say the word if you want real Cloud-backed orders, accounts, payments (Stripe), or admin dashboard — happy to add in a follow-up.

---

## What I need from you to start

Just approve and I'll begin Phase 1. I'll check in after each phase with a quick summary so you can redirect if anything should change.

**Scope confirmations (default = yes, tell me to flip any):**
1. Demo-only data for now (no real database/orders) — defer Cloud + Stripe to a follow-up?
2. Enable Lovable Cloud now just for the AI-quote feature?
3. Use placeholder WhatsApp number `+91 7591947287` from your uploaded design?
