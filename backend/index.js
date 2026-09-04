const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Kéo toàn bộ cấu hình Database và Models vào đây
const db = require('./src/models');
// Import seeder
const seedData = require('./src/utils/seeder');

// Import Routes
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NEXUS API!' });
});

// API Routes
app.use('/api/auth', authRoutes);

// ĐỒNG BỘ DATABASE RỒI MỚI CHẠY SERVER
db.sequelize.sync({ alter: true })
  .then(async () => {
    console.log('✅ Database đã được đồng bộ cấu trúc thành công!');

    // Chạy seeder nạp dữ liệu mẫu
    await seedData(db);

    // Bật server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Lỗi kết nối Database:', err);
  });