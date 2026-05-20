import "../lib/require-polyfill";
import mongoose, { Schema, Document } from "mongoose";


export interface IPricingRow {
  size: string;
  depth: string;
  price: string;
}

export interface IProduct extends Document {
  id: string; // custom ID or slug
  name: string;
  category: string;
  subtitle: string;
  description: string;
  image?: string; // base64 string or url
  gallery?: string[]; // array of base64 strings or urls
  hoverImage?: string; // base64 string or url
  selectedSizes: string[];
  selectedDepths: string[];
  pricingMatrix: IPricingRow[];
  badge?: string;
  isFeatured: boolean;
  isSignatureCollection: boolean;
  allowShipFlowers: boolean;
  allowUploadImages: boolean;
  showProductionTime: boolean;
  showShipping: boolean;
  showPayment: boolean;
  status: string;
  metaTitle?: string;
  metaDesc?: string;
  slug: string;
  createdAt: Date;
}

const PricingRowSchema = new Schema({
  size: { type: String, required: true },
  depth: { type: String, required: true },
  price: { type: String, required: true }
}, { _id: false });

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    gallery: [{ type: String }],
    hoverImage: { type: String },
    selectedSizes: [{ type: String }],
    selectedDepths: [{ type: String }],
    pricingMatrix: [PricingRowSchema],
    badge: { type: String },
    isFeatured: { type: Boolean, default: false },
    isSignatureCollection: { type: Boolean, default: false },
    allowShipFlowers: { type: Boolean, default: true },
    allowUploadImages: { type: Boolean, default: true },
    showProductionTime: { type: Boolean, default: true },
    showShipping: { type: Boolean, default: true },
    showPayment: { type: Boolean, default: true },
    status: { type: String, default: "active", required: true },
    metaTitle: { type: String },
    metaDesc: { type: String },
    slug: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
  },
  {
    timestamps: false
  }
);

// Prevent mongoose from compiling model multiple times during hot-reload
export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
