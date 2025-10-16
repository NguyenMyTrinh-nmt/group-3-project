// backend/middlewares/uploadMiddleware.js
const fs = require('fs');
const path = require('path');
const multer = require('multer');
let upload;

// If Cloudinary env vars are present, use CloudinaryStorage; otherwise fallback to disk storage
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  const { CloudinaryStorage } = require('multer-storage-cloudinary');
  const cloudinary = require('cloudinary').v2;

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'avatars', // folder on Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });

  upload = multer({ storage });
} else {
  // Fallback: store files locally in backend/uploads
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
    }
  });

  upload = multer({ storage });
}

module.exports = upload;

