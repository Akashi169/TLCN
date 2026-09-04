const seedData = async (db) => {
  try {
    // Kiểm tra xem DB đã có dữ liệu chưa (check bảng MembershipRank)
    const rankCount = await db.MembershipRank.count();
    if (rankCount > 0) {
      console.log('⚡ Dữ liệu mock đã tồn tại, bỏ qua bước seeding.');
      return;
    }

    console.log('🌱 Đang khởi tạo dữ liệu Mock (Seeding)...');

    // 1. Dữ liệu độc lập (Không có khóa ngoại)
    await db.MembershipRank.bulkCreate([
      { name: 'Đồng' },
      { name: 'Bạc' },
      { name: 'Vàng' },
      { name: 'Kim Cương' }
    ]);

    await db.PricingPlan.bulkCreate([
      { name: 'Gói Tiêu Chuẩn', price: 10000.00 },
      { name: 'Gói VIP', price: 15000.00 },
      { name: 'Gói Streamer', price: 20000.00 }
    ]);

    await db.GameCategory.bulkCreate([
      { name: 'Esports - Bắn Súng (FPS)' },
      { name: 'Esports - MOBA' },
      { name: 'AAA Trải Nghiệm' }
    ]);

    await db.ServiceCategory.bulkCreate([
      { name: 'Nước Ngọt' },
      { name: 'Mì & Đồ Ăn Nhanh' },
      { name: 'Cơm Văn Phòng' }
    ]);

    // 2. Dữ liệu phụ thuộc Cấp 1
    // Thêm User (Quản trị viên, Nhân viên & Khách hàng)
    const users = await db.User.bulkCreate([
      { username: 'admin', password: '123456', full_name: 'Quản Trị Viên Hệ Thống', role: 'ADMIN' },
      { username: 'employee', password: '123456', full_name: 'Nhân Viên Thu Ngân A', role: 'STAFF' },
      { username: 'user', password: '123456', full_name: 'Khách Hàng VIP', role: 'MEMBER' }
    ]);

    // Thêm Khu vực máy (Cần có pricing_plan_id)
    await db.ComputerZone.bulkCreate([
      { zone_name: 'Khu A - Hút Thuốc', description: 'Khu vực phổ thông', pricing_plan_id: 1 },
      { zone_name: 'Khu VIP - Cấm Hút Thuốc', description: 'Máy lạnh, ghế tựa cao cấp', pricing_plan_id: 2 }
    ]);

    // Thêm Game (Cần có category_id)
    await db.Game.bulkCreate([
      { name: 'CS2 (Counter-Strike 2)', category_id: 1 },
      { name: 'Valorant', category_id: 1 },
      { name: 'League of Legends', category_id: 2 },
      { name: 'Black Myth: Wukong', category_id: 3 }
    ]);

    // 3. Dữ liệu phụ thuộc Cấp 2
    // Thêm Profile Member cho user có role MEMBER (id = 3)
    const memberUser = users.find(u => u.role === 'MEMBER');
    if (memberUser) {
      await db.Member.create({
        member_id: memberUser.user_id, 
        real_balance: 500000.00,
        bonus_balance: 50000.00,
        rank_id: 3 // Hạng Vàng
      });
    }

    // Thêm Máy tính (Cần zone_id)
    await db.Computer.bulkCreate([
      { computer_name: 'MAY-A01', status: 'ONLINE', zone_id: 1 },
      { computer_name: 'MAY-VIP-01', status: 'ONLINE', zone_id: 2 }
    ]);

    console.log('✅ Khởi tạo dữ liệu Mock thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo dữ liệu Mock:', error);
  }
};

module.exports = seedData;