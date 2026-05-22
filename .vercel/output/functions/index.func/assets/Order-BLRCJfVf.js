import "../server.js";
import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema(
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
    address: {
      house: { type: String },
      area: { type: String },
      landmark: { type: String },
      district: { type: String },
      state: { type: String },
      pin: { type: String }
    },
    status: { type: String, default: "Order Received", required: true, index: true },
    expectedCompletionDate: { type: String },
    previewImage: { type: String },
    adminNotes: { type: String },
    courierDetails: { type: String },
    preBookingKit: { type: Boolean, default: false },
    kitPrice: { type: Number, default: 0 },
    kitStatus: { type: String, default: "" },
    paymentStatus: { type: String, default: "No Payment Yet", required: true },
    createdAt: { type: Date, default: Date.now, required: true, index: true },
    timeline: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now, required: true },
        note: { type: String }
      }
    ]
  },
  {
    timestamps: false
    // We manage createdAt explicitly
  }
);
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export {
  Order
};
