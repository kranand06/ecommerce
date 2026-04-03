import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config()

const DB_URL = process.env.MONGO_URI;


async function connectDB() {
  await mongoose.connect(DB_URL).then(() => {
        console.log("MongoDB connected");
      }).catch(err => {
        console.error("MongoDB connection error:", err);
      });
}

export default connectDB;