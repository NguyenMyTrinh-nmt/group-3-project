const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/', logController.createLog);   // Ghi log
router.get('/', logController.getLogs);      // Lấy log

module.exports = router;
