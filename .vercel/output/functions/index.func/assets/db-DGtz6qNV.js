import "../server.js";
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://eunoia_db_user:eunoia%402026@cluster0.z4udyji.mongodb.net/eunoia_resin_art?retryWrites=true&w=majority";
let cached = globalThis.mongoose;
if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}
async function connectToDatabase() {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };
    console.log("Initializing new MongoDB connection to Atlas...");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("Connected to MongoDB Atlas successfully!");
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Failed to connect to MongoDB:", e);
    throw e;
  }
  return cached.conn;
}
export {
  connectToDatabase
};
