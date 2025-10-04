// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Các API CRUD
router.get('/users', userController.getUsers);       // GET - lấy danh sách
router.post('/users', userController.createUser);    // POST - thêm mới
router.put('/users/:id', userController.updateUser); // PUT - cập nhật
router.delete('/users/:id', userController.deleteUser); // DELETE - xóa

module.exports = router;
