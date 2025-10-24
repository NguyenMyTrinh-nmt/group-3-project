const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { upload, processAvatar } = require('../middleware/uploadMiddleware'); //  Thêm middleware upload
const { verifyToken } = require('../middleware/authMiddleware'); 
const User = require('../models/User'); //  Dùng để cập nhật avatar


// CRUD user routes
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Upload avatar route
router.post(
  '/avatar',
  verifyToken,                    // ✅ Xác thực người dùng (nếu có middleware này)
  upload.single('avatar'),        // ✅ Nhận file ảnh gửi lên (tên field là "avatar")
  processAvatar,                  // ✅ Resize + upload (Cloudinary hoặc local)
  async (req, res) => {
    try {
      // Cập nhật avatar URL vào MongoDB
      const user = await User.findByIdAndUpdate(
        req.user.id,              // lấy id từ token
        { avatar: req.avatarUrl },
        { new: true }
      );

      if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

      res.json({
        message: 'Upload avatar thành công!',
        avatar: user.avatar,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Lỗi khi lưu avatar vào cơ sở dữ liệu.' });
    }
  }
);

module.exports = router;