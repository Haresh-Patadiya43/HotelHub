const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      w: "majority",
    });

    console.log("=================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📦 Host: ${conn.connection.host}`);
    console.log(`🗄️ Database: ${conn.connection.name}`);
    console.log("=================================");

    return conn;
  } catch (error) {
    console.error("=================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("=================================");

    process.exit(1);
  }
};

module.exports = connectDB;