import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Set MONGODB_URI in your .env file before running this script.");

async function cleanup() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB!");
    const OrderSchema = new mongoose.Schema({ id: String });
    const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
    
    const res = await Order.deleteOne({ id: "ERA-2026-LIVE-7202" });
    console.log("Cleaned up bot test order:", res.deletedCount);
    
    await mongoose.connection.close();
  } catch (err) {
    console.error("Cleanup error:", err);
  }
}

cleanup();
