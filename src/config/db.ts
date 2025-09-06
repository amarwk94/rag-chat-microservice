import mongoose from "mongoose";
import { logger } from "../utils/logger";

export const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI!;
    await mongoose.connect(uri, { autoIndex: true });
    logger.info("Connected to MongoDB successfully");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit on DB connection failure
  }
};
