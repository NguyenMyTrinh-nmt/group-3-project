// backend/middlewares/uploadMiddleware.js
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

let upload;
let processAvatar = null;

// === Nếu có Cloudinary thì dùng Cloudinary + resize ===
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  const cloudinary = require('cloudinary').v2;

  // Cấu hình Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Dùng memoryStorage để resize trước khi upload
  const storage = multer.memoryStorage();

  upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowed.includes(file.mimetype)) {
        cb(new Error('Chỉ được phép upload file ảnh (jpg, png, jpeg)!'));
      } else {
        cb(null, true);
      }
    },
  });

  // Middleware resize + upload Cloudinary
  processAvatar = async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Vui lòng chọn ảnh để upload.' });
      }

      // Resize ảnh
      const resizedBuffer = await sharp(req.file.buffer)
        .resize(200, 200)
        .jpeg({ quality: 90 })
        .toBuffer();

      // Upload lên Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(resizedBuffer);
      });

      req.avatarUrl = result.secure_url;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Lỗi khi xử lý ảnh avatar.' });
    }
  };
}
// === Nếu KHÔNG có Cloudinary thì fallback về lưu local ===
else {
  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
      cb(null, `${name}_${Date.now()}${ext}`);
    },
  });

  upload = multer({ storage });

  // Khi lưu local thì không resize
  processAvatar = (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn ảnh để upload.' });
    }
    req.avatarUrl = `/uploads/${req.file.filename}`;
    next();
  };
}

module.exports = { upload, processAvatar };
