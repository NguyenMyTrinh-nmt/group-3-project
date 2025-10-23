const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 5,              // Tối đa 5 lần thử đăng nhập / phút
  message: {
    message: "Too many login attempts, please try again after 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
