const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

<<<<<<< Updated upstream
// CRUD user routes
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
=======
// Auth
router.post('/signup', userController.signup); // ✅ thêm route đăng ký
router.post('/login', userController.login); // ✅ thêm route đăng nhập
>>>>>>> Stashed changes

// CRUD user
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;