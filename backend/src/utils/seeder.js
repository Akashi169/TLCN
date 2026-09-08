const seedData = async (db) => {
  try {
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync('123456', 10);

    // Cập nhật kiểu dữ liệu cột role trong MySQL để nhận được tất cả các Role mới
    try {
      await db.sequelize.query("ALTER TABLE users MODIFY COLUMN role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER'");
    } catch {
      // Ignore if database dialect or permission doesn't require alter
    }

    // 1. Dữ liệu độc lập (Không có khóa ngoại)
    const rankCount = await db.MembershipRank.count();
    if (rankCount === 0) {
      await db.MembershipRank.bulkCreate([
        { name: 'Đồng' },
        { name: 'Bạc' },
        { name: 'Vàng' },
        { name: 'Kim Cương' }
      ]);
    }

    const pricingCount = await db.PricingPlan.count();
    if (pricingCount === 0) {
      await db.PricingPlan.bulkCreate([
        { name: 'Gói Tiêu Chuẩn', price: 10000.00 },
        { name: 'Gói VIP', price: 15000.00 },
        { name: 'Gói Streamer', price: 20000.00 }
      ]);
    }

    const gameCatCount = await db.GameCategory.count();
    if (gameCatCount === 0) {
      await db.GameCategory.bulkCreate([
        { name: 'Esports - Bắn Súng (FPS)' },
        { name: 'Esports - MOBA' },
        { name: 'AAA Trải Nghiệm' }
      ]);
    }

    const serviceCatCount = await db.ServiceCategory.count();
    if (serviceCatCount === 0) {
      await db.ServiceCategory.bulkCreate([
        { name: 'Nước Ngọt' },
        { name: 'Mì & Đồ Ăn Nhanh' },
        { name: 'Cơm Văn Phòng' }
      ]);
    }

    // 2. Đảm bảo tất cả 3 vai trò tài khoản mẫu đều tồn tại trong DB với mật khẩu '123456'
    const defaultUsers = [
      { username: 'admin', full_name: 'Quản Trị Viên Hệ Thống', role: 'ADMIN' },
      { username: 'staff', full_name: 'Nhân Viên Thu Ngân A', role: 'STAFF' },
      { username: 'employee', full_name: 'Nhân Viên Thu Ngân B', role: 'STAFF' },
      { username: 'customer', full_name: 'Khách Hàng VIP', role: 'CUSTOMER' },
      { username: 'user', full_name: 'Khách Hàng Thường', role: 'CUSTOMER' }
    ];

    for (const item of defaultUsers) {
      const existing = await db.User.findOne({ where: { username: item.username } });
      if (!existing) {
        const newUser = await db.User.create({
          username: item.username,
          password: hashedPassword,
          full_name: item.full_name,
          role: item.role
        });

        if (item.role === 'CUSTOMER') {
          await db.Member.findOrCreate({
            where: { member_id: newUser.user_id },
            defaults: {
              member_id: newUser.user_id,
              real_balance: 500000.00,
              bonus_balance: 50000.00,
              rank_id: 3
            }
          });
        }
      } else {
        // Cập nhật lại password hash và role cho các tài khoản sẵn có
        existing.password = hashedPassword;
        if (existing.role === 'MEMBER') existing.role = 'CUSTOMER';
        if (existing.role === 'EMPLOYEE') existing.role = 'STAFF';
        await existing.save();
      }
    }

    // 3. Đảm bảo khu vực máy & game mẫu tồn tại
    const zoneCount = await db.ComputerZone.count();
    if (zoneCount === 0) {
      await db.ComputerZone.bulkCreate([
        { zone_name: 'Khu A - Hút Thuốc', description: 'Khu vực phổ thông', pricing_plan_id: 1 },
        { zone_name: 'Khu VIP - Cấm Hút Thuốc', description: 'Máy lạnh, ghế tựa cao cấp', pricing_plan_id: 2 }
      ]);
    }

    const computerCount = await db.Computer.count();
    if (computerCount === 0) {
      await db.Computer.bulkCreate([
        { computer_name: 'MAY-A01', status: 'ONLINE', zone_id: 1 },
        { computer_name: 'MAY-VIP-01', status: 'ONLINE', zone_id: 2 }
      ]);
    }

    console.log('✅ Đồng bộ & Khởi tạo dữ liệu Mock cho 3 vai trò thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo dữ liệu Mock:', error);
  }
};

module.exports = seedData;