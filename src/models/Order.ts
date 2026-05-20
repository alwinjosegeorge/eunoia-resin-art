import "../lib/require-polyfill";
import mongoose, { Schema, Document } from "mongoose";


export interface IOrder extends Document {
  id: string; // custom ID like "ERA-12345"
  customerName: string;
  customerPhone: string;
  customerWhatsapp?: string;
  productName: string;
  depth: string;
  price: number;
  submissionMethod: "ship" | "upload" | string;
  shippingDate?: string;
  notes?: string;
  address?: string;
  status: string;
  expectedCompletionDate?: string;
  previewImage?: string; // base64 string or image url
  adminNotes?: string;
  courierDetails?: string;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerWhatsapp: { type: String },
    productName: { type: String, required: true },
    depth: { type: String, required: true },
    price: { type: Number, required: true },
    submissionMethod: { type: String, required: true },
    shippingDate: { type: String },
    notes: { type: String },
    address: { type: String },
    status: { type: String, default: "Order Received", required: true },
    expectedCompletionDate: { type: String },
    previewImage: { type: String },
    adminNotes: { type: String },
    courierDetails: { type: String },
    createdAt: { type: Date, default: Date.now, required: true }
  },
  {
    timestamps: false // We manage createdAt explicitly
  }
);

// Prevent mongoose from compiling model multiple times during hot-reload
export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
