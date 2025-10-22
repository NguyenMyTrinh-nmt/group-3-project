const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { upload, processAvatar } = require("../middleware/uploadMiddleware");
const { verifyToken } = require("../middleware/authMiddleware"); 

router.put("/upload-avatar", verifyToken, upload.single("avatar"), processAvatar, authController.uploadAvatar);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/resetpassword/:token", authController.resetPassword);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
