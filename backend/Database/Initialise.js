import Food from "./schema.js";
import connectDB from "./db.js";
import mongoose from "mongoose";
import sampleData from "./Sample.js"

const intiDB = async () => {
    await connectDB();
    await Food.deleteMany({});
    await Food.insertMany(sampleData);
    console.log("Data base was initialised");
    mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
}

intiDB();