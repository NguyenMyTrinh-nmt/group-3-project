const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { v2: cloudinary } = require('cloudinary');

if (!process.env.CLOUDINARY_URL) {
  console.error('❌ Thiếu CLOUDINARY_URL trong backend/.env — bỏ qua test upload.');
  process.exit(1);
}

cloudinary.config({ secure: true });

async function testUpload() {
  try {
    const localPath = path.join(__dirname, 'unnamed.jpg');
    let uploadSource = null;
    if (fs.existsSync(localPath)) {
      console.log('📄 Dùng file local:', localPath);
      uploadSource = localPath;
    } else {
      const sampleUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
      console.log('🌐 Không tìm thấy unnamed.jpg, dùng ảnh mẫu:', sampleUrl);
      uploadSource = sampleUrl;
    }

    const result = await cloudinary.uploader.upload(uploadSource, {
      folder: 'avatars',
    });
    console.log('✅ Upload thành công! Ảnh URL:');
    console.log(result.secure_url);
  } catch (error) {
    console.error('❌ Lỗi upload:', error);
    process.exit(1);
  }
}

testUpload();
