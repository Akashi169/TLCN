const bcrypt = require('bcryptjs');

/**
 * Database Seeder Utility for NEXUS Cyber Management System
 * Populates clean, production-ready seed data into MySQL tables on sync.
 * DO NOT DELETE THIS FILE.
 */
const seedData = async (db) => {
  try {
    const hashedPassword = bcrypt.hashSync('123456', 10);

    // Ensure role column accepts all roles
    try {
      await db.sequelize.query("ALTER TABLE users MODIFY COLUMN role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER'");
    } catch {
      // Ignore dialect error if alter column is unnecessary
    }

    // 1. Seed Membership Ranks
    const rankCount = await db.MembershipRank.count();
    if (rankCount === 0) {
      await db.MembershipRank.bulkCreate([
        { rank_id: 1, name: 'Đồng' },
        { rank_id: 2, name: 'Bạc' },
        { rank_id: 3, name: 'Vàng' },
        { rank_id: 4, name: 'Kim Cương' }
      ]);
    }

    // 2. Seed Pricing Plans
    const pricingCount = await db.PricingPlan.count();
    if (pricingCount === 0) {
      await db.PricingPlan.bulkCreate([
        { pricing_plan_id: 1, name: 'Gói Tiêu Chuẩn', price: 10000.00 },
        { pricing_plan_id: 2, name: 'Gói VIP', price: 15000.00 },
        { pricing_plan_id: 3, name: 'Gói Streamer', price: 20000.00 },
        { pricing_plan_id: 4, name: 'Gói Cloud vGPU', price: 25000.00 }
      ]);
    }

    // 3. Seed Game Categories & Games
    const gameCatCount = await db.GameCategory.count();
    if (gameCatCount === 0) {
      await db.GameCategory.bulkCreate([
        { category_id: 1, name: 'Esports - Bắn Súng (FPS)' },
        { category_id: 2, name: 'Esports - MOBA' },
        { category_id: 3, name: 'AAA Trải Nghiệm' }
      ]);
    }

    const gameCount = await db.Game.count();
    if (gameCount === 0) {
      await db.Game.bulkCreate([
        { game_id: 1, name: 'Valorant', category_id: 1, icon_url: '', is_active: true },
        { game_id: 2, name: 'Counter-Strike 2', category_id: 1, icon_url: '', is_active: true },
        { game_id: 3, name: 'League of Legends', category_id: 2, icon_url: '', is_active: true },
        { game_id: 4, name: 'FC Online 4', category_id: 2, icon_url: '', is_active: true },
        { game_id: 5, name: 'Cyberpunk 2077 RT', category_id: 3, icon_url: '', is_active: true }
      ]);
    }

    // 4. Seed Computer Zones
    const zoneCount = await db.ComputerZone.count();
    if (zoneCount === 0) {
      await db.ComputerZone.bulkCreate([
        { zone_id: 1, zone_name: 'Zone 1: Esports Pro Arena', description: 'Máy thi đấu 360Hz BenQ ZOWIE, CPU i9', pricing_plan_id: 2 },
        { zone_id: 2, zone_name: 'Zone 2: VIP Gaming Suite', description: 'Phòng VIP ghế da cao cấp, RTX 4070 Ti', pricing_plan_id: 2 },
        { zone_id: 3, zone_name: 'Zone 3: Tiêu Chuẩn Combat', description: 'Khu vực phổ thông i5 RTX 4060', pricing_plan_id: 1 },
        { zone_id: 4, zone_name: 'Zone 4: Stream Studio', description: 'Phòng Studio cách âm, Cam 4K + RTX 4090', pricing_plan_id: 3 },
        { zone_id: 5, zone_name: 'Zone 5: Cloud Remote Nodes', description: 'Cụm Cloud vGPU stream WebRTC 1.1ms', pricing_plan_id: 4 }
      ]);
    }

    // 5. Seed Computers / Fleet Machines
    const computerCount = await db.Computer.count();
    if (computerCount === 0) {
      const initialComputers = [
        { computer_name: 'ESP-01', status: 'ONLINE', zone_id: 1 },
        { computer_name: 'ESP-02', status: 'ONLINE', zone_id: 1 },
        { computer_name: 'ESP-03', status: 'ONLINE', zone_id: 1 },
        { computer_name: 'ESP-04', status: 'ONLINE', zone_id: 1 },
        { computer_name: 'VIP-07', status: 'IN_USE', zone_id: 2 },
        { computer_name: 'VIP-12', status: 'ONLINE', zone_id: 2 },
        { computer_name: 'ST-05', status: 'IN_USE', zone_id: 3 },
        { computer_name: 'ST-18', status: 'MAINTENANCE', zone_id: 3 },
        { computer_name: 'ST-22', status: 'OFFLINE', zone_id: 3 },
        { computer_name: 'STR-02', status: 'IN_USE', zone_id: 4 },
        { computer_name: 'CLOUD-08', status: 'IN_USE', zone_id: 5 }
      ];

      // Add remaining standard PCs up to 30 machines
      for (let i = 1; i <= 20; i++) {
        const idStr = String(i).padStart(2, '0');
        if (!initialComputers.some(c => c.computer_name === `ST-${idStr}`)) {
          initialComputers.push({
            computer_name: `ST-${idStr}`,
            status: i % 3 === 0 ? 'ONLINE' : i % 5 === 0 ? 'OFFLINE' : 'ONLINE',
            zone_id: 3
          });
        }
      }

      await db.Computer.bulkCreate(initialComputers);
    }

    // 6. Seed Default Users & Member Accounts (3 Roles: ADMIN, STAFF, CUSTOMER)
    const seedUsers = [
      { username: 'admin', full_name: 'Quản Trị Viên Hệ Thống', role: 'ADMIN' },
      { username: 'staff', full_name: 'Nhân Viên Thu Ngân A', role: 'STAFF' },
      { username: 'employee', full_name: 'Nhân Viên Thu Ngân B', role: 'STAFF' },
      { username: 'nam.nv', full_name: 'Nguyễn Văn Nam', role: 'CUSTOMER', balance: 485000, rankId: 3 },
      { username: 'long.hoang', full_name: 'Hoàng Long', role: 'CUSTOMER', balance: 1200000, rankId: 3 },
      { username: 'baotran99', full_name: 'Trần Quốc Bảo', role: 'CUSTOMER', balance: 65000, rankId: 1 },
      { username: 'khoa_cyber', full_name: 'Lê Minh Khoa', role: 'CUSTOMER', balance: 15000, rankId: 1 },
      { username: 'linh.stream', full_name: 'Phạm Thùy Linh', role: 'CUSTOMER', balance: 890000, rankId: 4 },
      { username: 'dang.dh', full_name: 'Đỗ Hải Đăng', role: 'CUSTOMER', balance: 0, rankId: 2 },
      { username: 'customer', full_name: 'Khách Hàng VIP', role: 'CUSTOMER', balance: 500000, rankId: 3 },
      { username: 'user', full_name: 'Khách Hàng Thường', role: 'CUSTOMER', balance: 50000, rankId: 1 }
    ];

    for (const u of seedUsers) {
      const existingUser = await db.User.findOne({ where: { username: u.username } });
      if (!existingUser) {
        const newUser = await db.User.create({
          username: u.username,
          password: hashedPassword,
          full_name: u.full_name,
          role: u.role
        });

        if (u.role === 'CUSTOMER') {
          await db.Member.findOrCreate({
            where: { member_id: newUser.user_id },
            defaults: {
              member_id: newUser.user_id,
              real_balance: u.balance || 0,
              bonus_balance: Math.floor((u.balance || 0) * 0.1),
              rank_id: u.rankId || 1
            }
          });
        }
      } else {
        // Ensure hashed password and updated role
        existingUser.password = hashedPassword;
        if (existingUser.role === 'MEMBER') existingUser.role = 'CUSTOMER';
        if (existingUser.role === 'EMPLOYEE') existingUser.role = 'STAFF';
        await existingUser.save();
      }
    }

    console.log('✅ Synchronized Database & Successfully Seeded Mock Data for 3 Roles!');
  } catch (error) {
    console.error('❌ Error during Seeder execution:', error);
  }
};

module.exports = seedData;