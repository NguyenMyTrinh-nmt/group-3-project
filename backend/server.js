const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ Enable CORS cho frontend gọi được


// Kết nối MongoDB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/Profile');

// Mount routes
app.use('/', authRoutes); // Exposes signup/login without /api/auth prefix
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);


// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));