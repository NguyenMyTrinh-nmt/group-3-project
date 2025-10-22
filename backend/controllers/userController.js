const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 1. Import thư viện JWT

// [GET] /api/users
// exports.getUsers = async (req, res) => {
//     try {
//         // exclude password field
//         const users = await User.find().select('-password');
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.getUsers = async (req, res) => {
    try {
        // ✅ Chỉ Admin mới được xem danh sách user
        if (req.user && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
        }

        // exclude password field
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// [POST] /api/users
// Create a new user (password will be hashed)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

    // Let User model pre-save hook hash the password
    const newUser = new User({ name, email, password });
    await newUser.save();

    newUser.password = undefined;
    res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// [PUT] /api/users/:id
exports.updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // If password is being updated, we should load the document and save so pre-save hook runs
        let updatedUser;
        if (updateData.password) {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            user.set(updateData);
            await user.save();
            updatedUser = user;
        } else {
            updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        }
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        updatedUser.password = undefined;
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// [DELETE] /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// ... (code của các hàm getUsers, createUser, updateUser, deleteUser) ...

//
// BẠN CẦN THÊM HÀM SIGNUP VÀ LOGIN VÀO ĐÂY
//

exports.signup = async (req, res) => {
  // ... (Code xử lý signup của bạn)
  // ...
  // Ví dụ:
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }
    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 2. Tìm user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
    }

    // 3. So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
    }

    // 4. Tạo Tokens (Đây là phần quan trọng)
    // Tạo Access Token (hạn ngắn, ví dụ 15 phút)
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'MY_SECRET_KEY_123', // Thay bằng secret key của bạn
      { expiresIn: '15m' }
    );

    // Tạo Refresh Token (hạn dài, ví dụ 7 ngày)
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET || 'MY_REFRESH_SECRET_KEY_456', // Dùng secret key khác
      { expiresIn: '7d' }
    );

    // 5. Trả về tokens cho frontend
    res.json({
      message: 'Đăng nhập thành công',
      accessToken,
      refreshToken,
      user: {
        role: user.role,
        name: user.name
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// 🛑 QUAN TRỌNG:
// Xóa hết các module.exports khác và chỉ dùng MỘT khối này
module.exports = {
  getUsers: exports.getUsers,
  createUser: exports.createUser,
  updateUser: exports.updateUser,
  deleteUser: exports.deleteUser,
  signup: exports.signup,
  login: exports.login
};

