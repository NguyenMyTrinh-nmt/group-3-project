const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Lấy token từ header: Authorization: Bearer <token>
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    // Giải mã token để lấy thông tin user
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Lưu user id vào req.user để các route khác dùng
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
