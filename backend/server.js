const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Cloudinary (cần cài đặt: npm install cloudinary)
const cloudinary = require('cloudinary').v2;


const profileRoutes = require("./routes/profile");
const userAdminRoutes = require("./routes/userAdmin");
 origin/feature/refresh-token
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ Enable CORS cho frontend gọi được


// Kết nối MongoDB
mongoose.connect(
  "mongodb+srv://NHUNGOC:lvfcF9JwjEzVG9ZC@cluster0.ixbgxus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Import routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes); // Mount route
const profileRoutes = require('./routes/Profile');
app.use("/profile", profileRoutes);


// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
console.log("process.cwd():", process.cwd());
console.log("🔹 MONGO_URI:", process.env.MONGO_URI);
console.log("🔐 JWT secrets loaded?", {
  JWT_SECRET: Boolean(process.env.JWT_SECRET),
  JWT_REFRESH_SECRET: Boolean(process.env.JWT_REFRESH_SECRET),
});
// Kết nối MongoDB và Khởi động Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ Enable CORS cho frontend gọi được


// Kết nối MongoDB
mongoose.connect(
  "mongodb+srv://NHUNGOC:lvfcF9JwjEzVG9ZC@cluster0.ixbgxus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Import routes
const userRoutes = require('./routes/user');
app.use('/', userRoutes); // Mount route
const profileRoutes = require('./routes/Profile');
app.use("/Profile", profileRoutes);


// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
