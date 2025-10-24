const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 phút
    max: 5, // Tối đa 5 lần đăng nhập / phút
    
    // Đây là dòng đã được sửa lại cho đúng
    message: "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau 1 phút.",
    
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;