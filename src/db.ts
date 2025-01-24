import mongoose from "mongoose";

export const dbConnect = async () => {
  mongoose.connect(process.env.DB_STRING || "your_default_connection_string");
};
