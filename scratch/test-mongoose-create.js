import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://eunoia_db_user:eunoia%402026@cluster0.z4udyji.mongodb.net/eunoia_resin_art?retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB!");

    const testId = `ERA-2026-TEST-9999`;
    console.log("Deleting old test order if exists...");
    await mongoose.connection.db.collection("orders").deleteOne({ id: testId });

    console.log("Creating new order via raw MongoDB collection...");
    const initialStatus = "Order Received";
    const timeline = [
      {
        status: initialStatus,
        timestamp: new Date(),
        note: "Order placed successfully."
      }
    ];

    const result = await mongoose.connection.db.collection("orders").insertOne({
      id: testId,
      customerName: "Test Customer",
      customerPhone: "1234567890",
      productName: "5x5 Frame",
      depth: "15mm",
      price: 2000,
      submissionMethod: "upload",
      status: initialStatus,
      createdAt: new Date(),
      timeline: timeline
    });

    console.log("Inserted raw order:", result.insertedId);

    console.log("Querying it back...");
    const order = await mongoose.connection.db.collection("orders").findOne({ id: testId });
    console.log("Found:", order);

    console.log("Deleting test order...");
    await mongoose.connection.db.collection("orders").deleteOne({ id: testId });
    console.log("Deleted!");

    await mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
