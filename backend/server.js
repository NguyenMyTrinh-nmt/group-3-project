const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profileRoutes = require("./routes/profile");
const userAdminRoutes = require("./routes/userAdmin");



const app = express();
app.use(express.json());
app.use(cors());
app.use("/profile", profileRoutes);
app.use("/users", userAdminRoutes);

// Import routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authRoutes');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


console.log("__dirname:", __dirname);
console.log("process.cwd():", process.cwd());
console.log("🔹 MONGO_URI:", process.env.MONGO_URI);
// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
