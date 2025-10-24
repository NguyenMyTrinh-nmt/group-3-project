const express = require("express");
const router = express.Router();

const User = require("../models/User");
const verifyToken = require("../middleware/auth");
const { upload, processAvatar } = require("../middleware/uploadMiddleware");
const logActivity = require("../middleware/logActivity");

/**
 * @typedef {import("express").Request & { user?: { id: string }, avatarUrl?: string }} AvatarRequest
 */

/**
 * @typedef {import("express").Request & { user?: { id: string } }} AuthedRequest
 */

// [GET] /profile - Xem thông tin cá nhân
router.get("/", verifyToken, async (req, res) => {
  try {
    const reqWithUser = /** @type {AuthedRequest} */ (req);
    const userId = reqWithUser.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [PUT] /profile - Cập nhật thông tin cá nhân
router.put("/", verifyToken, async (req, res) => {
  try {
    const reqWithUser = /** @type {AuthedRequest} */ (req);
    const userId = reqWithUser.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, address },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(
  "/avatar",
  verifyToken,
  upload.single("avatar"),
  processAvatar,
  async (req, res) => {
    try {
      const typedReq = /** @type {AvatarRequest} */ (req);
      const userId = typedReq.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!typedReq.avatarUrl) {
        return res.status(400).json({ message: "Missing avatar URL" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { avatar: typedReq.avatarUrl },
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await logActivity(userId, "User updated avatar");

      res.json({
        message: "Upload avatar thành công!",
        avatar: updatedUser.avatar,
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
