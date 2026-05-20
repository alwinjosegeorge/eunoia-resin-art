import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://eunoia_db_user:eunoia%402026@cluster0.z4udyji.mongodb.net/eunoia_resin_art?retryWrites=true&w=majority";

async function test() {
  console.log("Connecting to MongoDB:", MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");
    const dbs = await mongoose.connection.db.admin().listDatabases();
    console.log("Databases:", dbs);
    await mongoose.disconnect();
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

test();
