import mongoose from 'mongoose';


async function connectDB() {
  await mongoose.connect("mongodb+srv://kranand6:br10ar4337@cluster0.i5o4jir.mongodb.net/Food-del?retryWrites=true&w=majority&appName=Cluster0").then(() => {
        console.log("MongoDB connected");
      }).catch(err => {
        console.error("MongoDB connection error:", err);
      });
}

export default connectDB;