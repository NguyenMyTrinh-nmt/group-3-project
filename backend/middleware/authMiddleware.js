const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Kiểm tra có header Authorization hay không
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Token theo chuẩn "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Invalid authorization format. Expected Bearer token.' });
  }

  // Xác thực token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token expired. Please refresh token.' });
      }
      return res.status(400).json({ message: 'Invalid token.' });
    }

    // Gán thông tin user vào request để middleware khác dùng
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
