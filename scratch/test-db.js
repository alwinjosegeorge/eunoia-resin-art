import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Set MONGODB_URI in your .env file before running this script.");

async function testConnection() {
  console.log("Attempting to connect to MongoDB Atlas...");
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log("SUCCESS: Connected to MongoDB successfully!");
    console.log("Ready state:", mongoose.connection.readyState);
    await mongoose.connection.close();
    console.log("Connection closed.");
  } catch (err) {
    console.error("FAILURE: Could not connect to MongoDB:", err.message || err);
  }
}

testConnection();
