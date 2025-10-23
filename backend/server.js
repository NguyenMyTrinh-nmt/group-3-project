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
const MONGO_URI = 'mongodb+srv://NHUNGOC:lvfcF9JwjEzVG9ZC@cluster0.ixbgxus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    console.error("Please check your MongoDB connection string and make sure MongoDB is running");
    process.exit(1);
});

// ✅ Import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

const profileRoutes = require('./routes/Profile');
app.use("/profile", profileRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
