const Log = require("../models/logModel");

const logActivity = async (userId, action) => {
  try {
    const newLog = new Log({
      userId,
      action,
      timestamp: new Date(),
    });
    await newLog.save();
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

module.exports = logActivity;
