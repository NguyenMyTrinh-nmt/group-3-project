
// logRoutes.js
const express = require('express');
const router = express.Router();

const logController = require('../controllers/logController');

// 1. Lấy tất cả Logs: URL là /api/logs/all
router.get('/all', logController.getLogs);

// 2. Thêm Log: URL là /api/logs/add
router.post('/add', logController.createLog);

module.exports = router;
const express = require("express");
const router = express.Router();
const { getAllLogs } = require("../controllers/logController");

router.get("/", getAllLogs);

module.exports = router;

