const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Kéo toàn bộ cấu hình Database và Models vào đây
const db = require('./src/models');
// Import seeder
const seedData = require('./src/utils/seeder');

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const memberRoutes = require('./src/routes/memberRoutes');

const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to NEXUS Cloud Cyber OS API!' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/members', memberRoutes);

// Centralized Error Handler
app.use(errorHandler);

// ĐỒNG BỘ DATABASE & BẬT SERVER
db.sequelize.sync()
  .then(async () => {
    console.log('✅ Kết nối & Đồng bộ cấu trúc Database thành công!');

    // Chạy seeder nạp dữ liệu mẫu nếu chưa có
    await seedData(db);

    // Bật server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Lỗi kết nối Database:', err);
  });