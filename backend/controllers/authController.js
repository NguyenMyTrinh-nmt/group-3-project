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
    // Defensive: ensure secrets are configured
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      return res.status(500).json({
        message: "Server misconfigured: missing JWT secrets",
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Sai mật khẩu' });

    // ====== 🔐 Tạo Access Token và Refresh Token ======
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Access Token có hạn 1 giờ
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // Refresh Token có hạn 7 ngày
    );

    // ====== 💾 Lưu Refresh Token vào Database ======
    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // ====== 📨 Trả về phản hồi ======
    res.json({
      message: 'Đăng nhập thành công',
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// [POST] /api/auth/logout
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Nếu có refreshToken, xóa nó khỏi DB để vô hiệu hóa
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }

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
    if (!email) {
      return res.status(400).json({ message: "Vui lòng cung cấp email" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email không tồn tại" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 phút
    await user.save();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        message: "Email service chưa được cấu hình. Vui lòng bổ sung EMAIL_USER và EMAIL_PASS",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let resetLink;
    if (process.env.RESET_PASSWORD_URL) {
      resetLink = process.env.RESET_PASSWORD_URL;
    } else {
      const baseResetUrl = `${req.protocol}://${req.get("host")}/api/auth/resetpassword`;
      resetLink = `${baseResetUrl}/${resetToken}`;
    }

    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      subject: "Reset mật khẩu tài khoản của bạn",
      html: `
        <p>Xin chào ${user.name || "bạn"},</p>
        <p>Bạn vừa yêu cầu đặt lại mật khẩu. Vui lòng bấm vào liên kết bên dưới để đi tới trang đặt mật khẩu mới. Mã xác thực chỉ có hiệu lực trong 15 phút.</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>Mã reset mật khẩu của bạn là: <strong>${resetToken}</strong></p>
        <p>Hãy sao chép mã này và nhập vào trang reset mật khẩu.</p>
        <p>Nếu bạn không yêu cầu thao tác này, hãy bỏ qua email.</p>
      `,
    });

    res.json({ message: "Đã gửi email reset mật khẩu" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// [POST] /api/auth/resetpassword/:token
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });

    user.password = newPassword; // middleware sẽ hash
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (err) {
    console.error(err);
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


//Tạo hàm sinh token trong authController.js
const RefreshToken = require("../models/RefreshToken");
// Tạo Access Token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1m" } // access token hết hạn nhanh để test
  );
};

// Tạo Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};


// [POST] /api/auth/refresh-token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Missing token" });

  try {
    // Kiểm tra token trong DB
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) return res.status(403).json({ message: "Invalid token" });

    // Xác thực token hợp lệ và lấy userId từ payload
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, payload) => {
      if (err) return res.status(403).json({ message: "Token expired" });

      try {
        // Lấy user từ DB để cấp access token đầy đủ claims
        const user = await User.findById(payload.id).select("_id email role");
        if (!user) return res.status(404).json({ message: "User not found" });

        const newAccessToken = generateAccessToken(user);
        return res.status(200).json({ accessToken: newAccessToken });
      } catch (innerErr) {
        return res.status(500).json({ message: innerErr.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

