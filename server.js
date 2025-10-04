// server.js (hoặc app.js)

const express = require('express');
const mongoose = require('mongoose');
const User = require('./User'); // Nhúng Model User

const app = express();
app.use(express.json()); // Dùng để đọc dữ liệu JSON từ POST request

// Đổi YOUR_CONNECTION_STRING_HERE thành Connection String từ Atlas
const ATLAS_URI = 'mongodb+srv://NHUNGOC:170904@cluster0.ixbgxus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(ATLAS_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas!'))
    .catch(err => console.error('❌ Connection error:', err));

// --- CÁC ROUTE XỬ LÝ DỮ LIỆU ---

// 1. Route GET: Lấy tất cả người dùng
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Route POST: Thêm người dùng mới
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body); // req.body phải chứa name và email
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Khởi động server
const PORT = 3000; // Hoặc port bạn đang dùng
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));