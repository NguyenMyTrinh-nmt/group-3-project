// models/RefreshToken.js
const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    token: { 
      type: String, 
      required: true, 
      index: true 
    },
    expiresAt: { 
      type: Date, 
      required: true 
    }
  },
  { timestamps: true }
);

// Tự động xóa refresh token khi hết hạn (TTL index)
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
