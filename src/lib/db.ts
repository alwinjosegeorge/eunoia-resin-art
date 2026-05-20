import { initRequirePolyfill } from "./require-polyfill";
initRequirePolyfill();
import mongoose from "mongoose";


// URL encode the '@' in the password to '%40' for valid connection URI parsing
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://eunoia_db_user:eunoia%402026@cluster0.z4udyji.mongodb.net/eunoia_resin_art?retryWrites=true&w=majority";

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
