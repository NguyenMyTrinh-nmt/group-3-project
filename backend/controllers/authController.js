const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// [POST] /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email đã tồn tại' });

    // Let the User model's pre-save hook handle password hashing
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: 'Đăng ký thành công',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [POST] /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Sai mật khẩu' });

    const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
  );

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [POST] /api/auth/logout
exports.logout = async (req, res) => {
  try {
    // Với JWT thì logout chỉ cần xóa token phía client
    res.json({ message: 'Đăng xuất thành công (xóa token phía client)' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
