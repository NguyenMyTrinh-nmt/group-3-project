const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const User = require("./models/User");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI không được thiết lập trong backend/.env");
    process.exit(1);
  }
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

async function seedUsers() {
  try {
    await User.deleteMany({});
    console.log("🗑️ Đã xóa dữ liệu cũ trong collection users");

    const users = [
      { name: "user", email: "user@gmail.com", password: "123456", role: "user" },
      { name: "admin", email: "admin@gmail.com", password: "123456", role: "admin" },
      { name: "moderator", email: "moderator@gmail.com", password: "123456", role: "moderator" },
    ];

    for (const u of users) {
      const doc = new User(u);
      await doc.save(); // dùng pre-save để hash password
    }
    console.log("🌱 Seed dữ liệu mẫu thành công!");
  } catch (err) {
    console.error("❌ Lỗi khi seed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

(async () => {
  await connectDB();
  await seedUsers();
})();
