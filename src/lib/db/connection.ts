import mongoose from "mongoose";
import "colors";

mongoose.set("strictQuery", true);

const MONGO_URL =
  process.env.NODE_ENV !== "production"
    ? process.env.LOCAL_DB
    : process.env.MONGO_URL;

// Throw an error if no database connection string is set
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"'.bgRed);
}

// Connect asynchronously in order to catch initial connection errors
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to database!".bgGreen);
  } catch (error) {
    console.log("Error connecting to database!".bgRed);

    // Try reconnecting after 5 seconds if there is an error on initial connection
    setTimeout(() => connectDB(), 5000);
  }
};

export default connectDB;
