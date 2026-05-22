import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://eunoia_db_user:eunoia%402026@cluster0.z4udyji.mongodb.net/eunoia_resin_art?retryWrites=true&w=majority";

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
