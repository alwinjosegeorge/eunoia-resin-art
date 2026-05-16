import coaster from "@/assets/product-coaster.jpg";
import teak from "@/assets/product-teakframe.jpg";
import hex from "@/assets/product-hex.jpg";
import hoop from "@/assets/product-hoop.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "teak-frame",
    name: "9x12 Teak Frame",
    tagline: "Reclaimed teak · 15mm depth",
    category: "Teak Wood Frames",
    price: 14500,
    image: teak,
    badge: "Bestseller",
    description:
      "A soulfully handcrafted vessel for your most cherished memories. Reclaimed teak meets the ethereal transparency of premium epoxy resin — each pour a unique dance of light and shadow.",
  },
  {
    id: "ethereal-coaster",
    name: "Ethereal Petals Coaster Set",
    tagline: "Set of 4 · Hand-pressed hydrangeas",
    category: "Coasters",
    price: 3200,
    image: coaster,
    description: "Hand-pressed hydrangeas suspended in crystal resin, finished with champagne gold trim.",
  },
  {
    id: "eternal-rose-hex",
    name: "Eternal Rose Hexagon",
    tagline: "Single preserved rose · 30mm deepcast",
    category: "Hexagon Deepcast",
    price: 5200,
    image: hex,
    badge: "Only 2 left",
    description: "A single preserved red rose floats forever inside a hand-cut hexagonal deepcast with gold flake constellations.",
  },
  {
    id: "celestial-hoop",
    name: "Celestial Bloom Hoop",
    tagline: "10\" hoop · Dried botanicals",
    category: "Hoop Collection",
    price: 1850,
    image: hoop,
    description: "A delicate composition of dried daisies and ferns floating in a beechwood hoop.",
  },
  {
    id: "midnight-vanity",
    name: "Midnight Ocean Vanity Tray",
    tagline: "12\" x 8\" · Deep teal & gold leaf",
    category: "Trays",
    price: 5500,
    image: teak,
    description: "Deep teal ocean tones cresting in gold leaf waves, set in a hand-polished teak frame.",
  },
  {
    id: "golden-petal",
    name: "Golden Petal Coaster",
    tagline: "Single coaster · Pressed petals",
    category: "Coasters",
    price: 450,
    image: coaster,
    description: "A single coaster with pressed golden petals and champagne flake.",
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
