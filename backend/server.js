const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Cloudinary (cần cài đặt: npm install cloudinary)
const cloudinary = require("cloudinary").v2;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Kết nối MongoDB
const DEFAULT_MONGO_URI =
  "mongodb+srv://NHUNGOC:lvfcF9JwjEzVG9ZC@cluster0.ixbgxus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoUri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    console.error(
      "Please check your MongoDB connection string and make sure MongoDB is running"
    );
    process.exit(1);
  });

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const logRoutes = require("./routes/logRoutes");

app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/api/logs", logRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
