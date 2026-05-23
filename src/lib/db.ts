import { initRequirePolyfill } from "./require-polyfill";
initRequirePolyfill();
import mongoose from "mongoose";


// MONGODB_URI must be set as an environment variable (e.g. in .env or Vercel settings).
// Never hardcode credentials here!
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI environment variable is not set. " +
    "Add it to your .env file locally, or to Vercel Environment Variables in production."
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (globalThis as any).mongoose;

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
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
