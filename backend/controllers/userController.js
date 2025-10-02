// controllers/userController.js
let users = [];
let nextId = 1;

// GET /users
exports.getUsers = (req, res) => {
  res.json(users);
};

// POST /users
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name và email là bắt buộc" });
  }
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
};