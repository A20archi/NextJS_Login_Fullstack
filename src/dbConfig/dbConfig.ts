import { connect } from "http2";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUrl = process.env.mongo_url;
        if (!mongoUrl) {
            throw new Error("MongoDB connection string (mongo_url) is not defined in environment variables.");
        }
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
