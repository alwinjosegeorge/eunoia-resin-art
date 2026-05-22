import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://eunoia_db_user:eunoia%402026@cluster0.z4udyji.mongodb.net/eunoia_resin_art?retryWrites=true&w=majority";

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
