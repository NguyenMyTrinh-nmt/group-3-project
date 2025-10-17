const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkRole } = require('../middleware/checkRole');

// CRUD user routes
router.get('/', checkRole(['admin']), userController.getUsers);
router.post('/', checkRole(['admin']), userController.createUser);
router.put('/:id', checkRole(['admin']), userController.updateUser);
router.delete('/:id', checkRole(['admin']), userController.deleteUser);

module.exports = router;
