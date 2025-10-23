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
};
