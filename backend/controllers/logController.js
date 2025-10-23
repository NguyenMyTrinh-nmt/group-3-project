<<<<<<< HEAD
const Log = require('../models/logModel');

// Simple handler to return all logs (if model exists) or empty array
exports.getAllLogs = async (req, res) => {
  try {
    if (Log) {
      const logs = await Log.find().sort({ createdAt: -1 }).limit(100);
      return res.json(logs);
    }
  } catch (err) {
    // ignore if model not defined
  }
  res.json([]);
=======
const Log = require('../models/Log');

// Thêm log
exports.createLog = async (req, res) => {
  try {
    const { userId, action } = req.body;
    const ip = req.ip;

    const newLog = new Log({ userId, action, ip });
    await newLog.save();

    res.status(201).json({ message: "Log saved successfully", log: newLog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả log (cho admin)
exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate("userId", "email");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
>>>>>>> 47a3f2b (Thêm logController.js)
};
