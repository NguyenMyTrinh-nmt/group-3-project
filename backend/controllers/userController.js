const User = require('../models/User');
const bcrypt = require('bcryptjs');

// [GET] /api/users
exports.getUsers = async (req, res) => {
    try {
        // exclude password field
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// [POST] /api/users
// Create a new user (password will be hashed)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

    // Let User model pre-save hook hash the password
    const newUser = new User({ name, email, password });
    await newUser.save();

    newUser.password = undefined;
    res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// [PUT] /api/users/:id
exports.updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // If password is being updated, we should load the document and save so pre-save hook runs
        let updatedUser;
        if (updateData.password) {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            user.set(updateData);
            await user.save();
            updatedUser = user;
        } else {
            updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        }
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        updatedUser.password = undefined;
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// [DELETE] /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
