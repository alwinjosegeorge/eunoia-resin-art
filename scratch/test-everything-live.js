import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Set MONGODB_URI in your .env file before running this script.");

async function verifyEverything() {
  console.log("=== STEP 1: Waiting for Vercel to complete deployment ===");
  console.log("Sleeping for 15 seconds...");
  await new Promise(resolve => setTimeout(resolve, 15000));

  console.log("\n=== STEP 2: Checking Live Vercel API Health ===");
  try {
    const healthRes = await fetch("https://eunoia-resin-art.vercel.app/api/health");
    console.log("Health HTTP Status:", healthRes.status);
    const health = await healthRes.json();
    console.log("Health response:", JSON.stringify(health, null, 2));
  } catch (e) {
    console.error("Health check failed:", e);
  }

  const testOrderId = `ERA-2026-LIVE-${Math.floor(1000 + Math.random() * 9000)}`;
  console.log(`\n=== STEP 3: Posting Test Order ${testOrderId} to Vercel API ===`);
  try {
    const mockOrder = {
      id: testOrderId,
      customerName: "Live Verification Bot",
      customerPhone: "9999999999",
      customerWhatsapp: "9999999999",
      productName: "9x12 Teak Frame",
      depth: "15mm",
      price: 4001,
      submissionMethod: "upload",
      notes: "Verification of fixed Vercel request buffering.",
      address: {
        house: "Vercel QA Dept",
        area: "Cloud Way",
        district: "Calicut",
        state: "Kerala",
        pin: "673602"
      },
      status: "Order Received"
    };

    const postRes = await fetch("https://eunoia-resin-art.vercel.app/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockOrder)
    });

    console.log("POST Response Status:", postRes.status);
    const postBody = await postRes.json();
    console.log("POST Response Body:", JSON.stringify(postBody, null, 2));
  } catch (e) {
    console.error("POST failed:", e);
  }

  console.log("\n=== STEP 4: Querying MongoDB Atlas Directly ===");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas!");
    
    const OrderSchema = new mongoose.Schema({
      id: String,
      customerName: String,
      status: String,
      createdAt: Date
    });
    const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

    const savedOrder = await Order.findOne({ id: testOrderId });
    if (savedOrder) {
      console.log("SUCCESS! Test order was successfully saved to MongoDB via Vercel POST API!");
      console.log("- ID:", savedOrder.id);
      console.log("- Customer Name:", savedOrder.customerName);
      console.log("- Status:", savedOrder.status);
      
      console.log("\n=== STEP 5: Cleaning up test order ===");
      await Order.deleteOne({ id: testOrderId });
      console.log("Successfully cleaned up test order from database.");
    } else {
      console.error("FAILURE: Test order was NOT found in MongoDB! The Vercel POST API might have failed or not reached DB.");
    }

    await mongoose.connection.close();
  } catch (e) {
    console.error("DB verification failed:", e);
  }
}

verifyEverything();
