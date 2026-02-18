import mongoose from "mongoose";
import { config } from "@/config/env";

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("MongoDB connection failed!", error);
    process.exit(1);
  }
};

export default connectDB;