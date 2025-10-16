const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
// Cần import Cloudinary (Đã được cấu hình trong server.js)
const cloudinary = require('cloudinary').v2;


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

// [POST] /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email không tồn tại" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 phút
    await user.save();

    // If email credentials are not configured, don't attempt to send email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      // For development convenience, return the token (do NOT do this in production)
      return res.json({ message: "Reset token created (email not configured)", resetToken });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Reset Password Token",
      text: `Token reset của bạn là: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Đã gửi token reset qua email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// [POST] /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });

    user.password = newPassword; // nhớ có middleware hash password trong model
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// [POST] /api/auth/upload-avatar
exports.uploadAvatar = async (req, res) => {
  try {
    // Giả định middleware xác thực đã gắn ID người dùng vào req.user.id
    const userId = req.user.id; 

    // 1. Kiểm tra file (từ middleware multer)
    if (!req.file) {
        return res.status(400).json({ message: "Không tìm thấy file để upload." });
    }
    
    // 2. Upload file lên Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_avatars", // Tên thư mục trên Cloudinary
    });

    // 3. LẤY URL CÔNG KHAI TỪ CLOUDINARY
    const publicUrl = uploadResult.secure_url; // Chuỗi URL hợp lệ

    // 4. CẬP NHẬT TRƯỜNG 'avatar' trong DB bằng URL công khai
    const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { avatar: publicUrl }, 
        { new: true, select: '-password' }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    // 5. Trả về URL công khai
    res.json({ 
        message: "Cập nhật avatar thành công", 
        avatar: updatedUser.avatar, // Gửi URL đã lưu trong DB
        user: updatedUser
    });

  } catch (error) {
    console.error("Lỗi Upload Avatar:", error);
    res.status(500).json({ message: "Lỗi upload avatar" });
  }
};