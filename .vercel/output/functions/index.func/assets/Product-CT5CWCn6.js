import "../server.js";
import mongoose, { Schema } from "mongoose";
const PricingRowSchema = new Schema({
  size: { type: String, required: true },
  depth: { type: String, required: true },
  price: { type: String, required: true }
}, { _id: false });
const ProductSchema = new Schema(
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
    status: { type: String, default: "active", required: true, index: true },
    metaTitle: { type: String },
    metaDesc: { type: String },
    slug: { type: String, required: true, index: true },
    createdAt: { type: Date, default: Date.now, required: true, index: true }
  },
  {
    timestamps: false
  }
);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export {
  Product
};
