const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { upload, processAvatar } = require("../middleware/uploadMiddleware");
const { verifyToken } = require("../middleware/authMiddleware"); 
const loginLimiter = require("../middleware/rateLimit");


router.put("/upload-avatar", verifyToken, upload.single("avatar"), processAvatar, authController.uploadAvatar);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/refresh-token", authController.refreshToken);
router.post('/login', loginLimiter, authController.login);

module.exports = router;
    