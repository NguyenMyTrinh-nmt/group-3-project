const express = require('express');
const router = express.Router();

// 1. Import controller (giữ nguyên)
const logController = require("../controllers/logController");

// --- Các routes ---

// 2. Sửa "gets" thành "getLogs" (VIẾT ĐÚNG TÊN)
router.get("/", logController.getLogs); 

// 3. Sửa "createlog" thành "createLog" (VIẾT ĐÚNG TÊN)
router.post('/add', logController.createLog);

module.exports = router;