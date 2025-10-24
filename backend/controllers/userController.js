
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

const User = require('../models/User'); // Import model Mongoose
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET /users - Lấy danh sách user
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /signup - Đăng ký user mới
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email và password là bắt buộc' });
    }

    // Kiểm tra username hoặc email đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username hoặc email đã tồn tại' });
    }

    // Hash password trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /auth/login - Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email và password là bắt buộc' });

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });

    // So sánh password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });

    // Tạo JWT token
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      'your_jwt_secret', // thay bằng biến môi trường
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      'your_refresh_secret', // thay bằng biến môi trường
      { expiresIn: '30s' }
    );

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

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }+
// POST /users - Thêm user (dành cho quản lý user)
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'Username, email và password là bắt buộc' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /users/:id - Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Nếu có password mới, hash trước
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /users/:id - Xóa user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
};