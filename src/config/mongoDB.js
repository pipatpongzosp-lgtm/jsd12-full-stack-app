import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri, { dbname: "jsd12-express-app" });
    console.log("MongoDM connectes 🟢🛜");
  } catch (err) {
    console.log("MongoDM connectes error 🔴🛜 ", err);

    //ใช้งานได้เมื่อเชื่อมต่อDB ได้เท่านั้น
    throw err;
  }
}
