const mongoose = require('mongoose');

// Định nghĩa Schema cho người dùng
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Đảm bảo email không trùng lặp
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo Model từ Schema
const User = mongoose.model('User', userSchema);

module.exports = User;