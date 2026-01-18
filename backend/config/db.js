import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully ✅");
  } catch (error) {
    console.error("DB connection failed ❌", error);
    process.exit(1); // Stop server if DB connection fails
  }
};

export default connectDb;
