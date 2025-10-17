const express = require('express');
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user');

// Mount routes
app.use('/', userRoutes);  // endpoint /users sẽ dùng file routes/user.js

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
