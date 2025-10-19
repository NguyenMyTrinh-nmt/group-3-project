const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< Updated upstream
// Import Cloudinary (cần cài đặt: npm install cloudinary)
const cloudinary = require('cloudinary').v2;


const profileRoutes = require("./routes/profile");
const userAdminRoutes = require("./routes/userAdmin");

const app = express();

// --- 1. CẤU HÌNH CLOUDINARY ---
// Đảm bảo Cloudinary đọc được CLOUDINARY_URL từ file .env
cloudinary.config(); 

// --- 2. PHỤC VỤ CÁC FILE TĨNH (CSS, JS, HTML) ---
// Giả định các file Frontend đã được build vào thư mục 'frontend/build'
app.use(express.static(path.join(__dirname, 'frontend', 'build'))); 


// --- MIDDLEWARE VÀ ROUTING ---
app.use(express.json());
app.use(cors());

// Các route không dùng tiền tố /api (thường dùng cho các route cũ hoặc chuyên biệt)
app.use("/profile", profileRoutes);
app.use("/users", userAdminRoutes);

// Import routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authRoutes');

// Mount routes (sử dụng tiền tố /api)
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


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
=======
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
>>>>>>> Stashed changes
