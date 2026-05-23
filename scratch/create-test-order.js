import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Set MONGODB_URI in your .env file before running this script.");

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
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
  status: { type: String, default: "Order Received", required: true },
  expectedCompletionDate: { type: String },
  previewImage: { type: String },
  adminNotes: { type: String },
  courierDetails: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

async function createOrder() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB!");

    const testId = `ERA-TEST-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = new Order({
      id: testId,
      customerName: "Test Customer",
      customerPhone: "1234567890",
      customerWhatsapp: "1234567890",
      productName: "5x5 Frame",
      depth: "15mm",
      price: 2000,
      submissionMethod: "upload",
      notes: "Test notes",
      address: {
        house: "Test House",
        area: "Test Area",
        landmark: "Test Landmark",
        district: "Test District",
        state: "Test State",
        pin: "673602"
      },
      status: "Order Received"
    });

    const saved = await newOrder.save();
    console.log("Successfully saved test order:", saved.id);

    // clean it up
    await Order.deleteOne({ id: testId });
    console.log("Cleaned up test order!");

    await mongoose.connection.close();
  } catch (err) {
    console.error("Mongoose validation/save error:", err);
  }
}

createOrder();
