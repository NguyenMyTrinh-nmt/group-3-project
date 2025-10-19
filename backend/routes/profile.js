const express = require("express");
const router = express.Router();

<<<<<<< Updated upstream
const User = require("../models/User"); // model user
const verifyToken = require("../middleware/auth"); // middleware JWT

// [GET] /profile - Xem thông tin cá nhân
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [PUT] /profile - Cập nhật thông tin cá nhân
router.put("/", verifyToken, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

=======
router.get("/", (req, res) => {
  res.json({ message: "Lấy thông tin thành công!" });
>>>>>>> Stashed changes
});

module.exports = router;
