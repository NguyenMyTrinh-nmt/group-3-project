const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 5,              // Tối đa 5 lần thử đăng nhập / phút
  message: {
<<<<<<< HEAD
    message: "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau 1 phút.",
=======
    message: "Too many login attempts, please try again after 1 minute.",
>>>>>>> 8da7bcfc1fd844be659abc8705077d6f85f3c75a
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
