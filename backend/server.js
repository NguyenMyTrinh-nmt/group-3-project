const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ Enable CORS cho frontend gọi được


// Kết nối MongoDB
mongoose.connect(
  "mongodb+srv://NHUNGOC:lvfcF9JwjEzVG9ZC@cluster0.ixbgxus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Import routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes); // Mount route
const profileRoutes = require('./routes/Profile');
app.use("/profile", profileRoutes);


// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));