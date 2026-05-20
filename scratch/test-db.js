import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://eunoia_db_user:eunoia%402026@cluster0.z4udyji.mongodb.net/eunoia_resin_art?retryWrites=true&w=majority";

async function testConnection() {
  console.log("Attempting to connect to MongoDB Atlas...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("SUCCESS: Connected to MongoDB Atlas successfully!");
    
    // Check if the Product collection is accessible
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log("Disconnected successfully.");
  } catch (error) {
    console.error("FAILURE: Could not connect to MongoDB Atlas:", error);
  }
}

testConnection();
