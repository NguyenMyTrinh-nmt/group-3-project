const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String }, // optional - lưu IP user
});

module.exports = mongoose.models.Log || mongoose.model('Log', logSchema);
