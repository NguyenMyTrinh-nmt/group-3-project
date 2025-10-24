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
};
