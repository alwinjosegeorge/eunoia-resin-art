import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Set MONGODB_URI in your .env file before running this script.");

const OrderSchema = new mongoose.Schema({
  id: String,
  customerName: String,
  customerPhone: String,
  productName: String,
  price: Number,
  status: String,
  createdAt: Date
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

async function listOrders() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB!");
    const orders = await Order.find({}).sort({ createdAt: -1 });
    console.log(`Found ${orders.length} orders:`);
    orders.forEach(o => {
      console.log(`- ID: ${o.id}, Customer: ${o.customerName}, Product: ${o.productName}, Price: ${o.price}, Status: ${o.status}, CreatedAt: ${o.createdAt}`);
    });
    await mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
  }
}

listOrders();
