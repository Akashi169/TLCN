const bcrypt = require('bcryptjs');
const { UserRole, UserStatus, ComputerStatus, SessionType, TransactionType, TransactionCategory } = require('../constants/enums');

/**
 * Database Seeder Utility for NEXUS Cyber Management System
 * Populates production-ready seed data aligned 100% with backend/src/config/model.js & sql.sql.
 * Wrapped with safe constraint handling to prevent startup crashes.
 */
const seedData = async (db) => {
  try {
    const hashedPassword = bcrypt.hashSync('123456', 10);

    // Helper for safe seeding
    const safeSeed = async (model, data, idField = null) => {
      try {
        const count = await model.count();
        if (count === 0) {
          await model.bulkCreate(data, { ignoreDuplicates: true });
        }
      } catch (err) {
        console.warn(`[Seeder Warning] Error seeding ${model.name || 'table'}:`, err.message);
      }
    };

    // 1. Seed Membership Ranks
    await safeSeed(db.MembershipRank, [
      { rank_id: 1, name: 'Đồng', required_point: 0, rank_level: 1, discount_percent: 0.00 },
      { rank_id: 2, name: 'Bạc', required_point: 500, rank_level: 2, discount_percent: 5.00 },
      { rank_id: 3, name: 'Vàng', required_point: 1500, rank_level: 3, discount_percent: 10.00 },
      { rank_id: 4, name: 'Kim Cương', required_point: 3000, rank_level: 4, discount_percent: 15.00 }
    ]);

    // 2. Seed Pricing Plans
    await safeSeed(db.PricingPlan, [
      { pricing_plan_id: 1, name: 'Gói Tiêu Chuẩn', price_per_hour: 10000.00, plan_type: SessionType.LOCAL, priority: 1, is_active: true },
      { pricing_plan_id: 2, name: 'Gói VIP', price_per_hour: 15000.00, plan_type: SessionType.LOCAL, priority: 2, is_active: true },
      { pricing_plan_id: 3, name: 'Gói Streamer Pro', price_per_hour: 20000.00, plan_type: SessionType.LOCAL, priority: 3, is_active: true },
      { pricing_plan_id: 4, name: 'Gói Cloud vGPU Remote', price_per_hour: 25000.00, plan_type: SessionType.REMOTE, priority: 4, is_active: true }
    ]);

    // 3. Seed Service Categories & Game Categories
    await safeSeed(db.ServiceCategory, [
      { category_id: 1, name: 'Đồ Uống & Nước Giải Khát' },
      { category_id: 2, name: 'Đồ Ăn Nhanh & Ẩm Thực' },
      { category_id: 3, name: 'Thẻ Game & Dịch Vụ' }
    ]);

    await safeSeed(db.GameCategory, [
      { category_id: 1, name: 'Esports - Bắn Súng (FPS)' },
      { category_id: 2, name: 'Esports - MOBA' },
      { category_id: 3, name: 'AAA Trải Nghiệm & Nhập Vai' }
    ]);

    // 4. Seed Computer Zones
    await safeSeed(db.ComputerZone, [
      { zone_id: 1, zone_name: 'Zone 1: Esports Pro Arena', description: 'Máy thi đấu 360Hz BenQ ZOWIE, CPU i9', tier_level: 2 },
      { zone_id: 2, zone_name: 'Zone 2: VIP Gaming Suite', description: 'Phòng VIP ghế da cao cấp, RTX 4070 Ti', tier_level: 2 },
      { zone_id: 3, zone_name: 'Zone 3: Tiêu Chuẩn Combat', description: 'Khu vực phổ thông i5 RTX 4060', tier_level: 1 },
      { zone_id: 4, zone_name: 'Zone 4: Stream Studio', description: 'Phòng Studio cách âm, Cam 4K + RTX 4090', tier_level: 3 },
      { zone_id: 5, zone_name: 'Zone 5: Cloud Remote Nodes', description: 'Cụm Cloud vGPU stream WebRTC 1.1ms', tier_level: 4 }
    ]);

    // Seed Zone Pricing Plan relationships safely
    try {
      const zonePricingCount = await db.ZonePricingPlan.count();
      if (zonePricingCount === 0) {
        const existingZoneIds = (await db.ComputerZone.findAll({ attributes: ['zone_id'] })).map((z) => z.zone_id);
        const existingPlanIds = (await db.PricingPlan.findAll({ attributes: ['pricing_plan_id'] })).map((p) => p.pricing_plan_id);

        const links = [
          { zone_id: 1, pricing_plan_id: 2 },
          { zone_id: 2, pricing_plan_id: 2 },
          { zone_id: 3, pricing_plan_id: 1 },
          { zone_id: 4, pricing_plan_id: 3 },
          { zone_id: 5, pricing_plan_id: 4 }
        ].filter((l) => existingZoneIds.includes(l.zone_id) && existingPlanIds.includes(l.pricing_plan_id));

        if (links.length > 0) {
          await db.ZonePricingPlan.bulkCreate(links, { ignoreDuplicates: true });
        }
      }
    } catch (e) {
      console.warn('[Seeder Warning] Skipping ZonePricingPlan seed:', e.message);
    }

    // 5. Seed Users & Members
    try {
      const userCount = await db.User.count();
      if (userCount === 0) {
        await db.User.bulkCreate([
          { user_id: 1, username: 'admin', password_hash: hashedPassword, full_name: 'Quản Trị Viên Hệ Thống', role: UserRole.ADMIN, status: UserStatus.ACTIVE },
          { user_id: 2, username: 'staff1', password_hash: hashedPassword, full_name: 'Nguyễn Văn Thu Ngân', role: UserRole.EMPLOYEE, status: UserStatus.ACTIVE },
          { user_id: 3, username: 'customer1', password_hash: hashedPassword, full_name: 'Trần Văn ProGamer', role: UserRole.MEMBER, status: UserStatus.ACTIVE },
          { user_id: 4, username: 'customer2', password_hash: hashedPassword, full_name: 'Lê Thi VIP', role: UserRole.MEMBER, status: UserStatus.ACTIVE }
        ], { ignoreDuplicates: true });

        await db.Member.bulkCreate([
          { member_id: 3, id_number: '079200012345', phone: '0901234567', real_balance: 150000.00, bonus_balance: 50000.00, point: 1200, rank_id: 2 },
          { member_id: 4, id_number: '079200054321', phone: '0987654321', real_balance: 500000.00, bonus_balance: 100000.00, point: 3500, rank_id: 4 }
        ], { ignoreDuplicates: true });
      }
    } catch (e) {
      console.warn('[Seeder Warning] Skipping User/Member seed:', e.message);
    }

    // 6. Seed Computers
    await safeSeed(db.Computer, [
      { computer_id: 1, computer_name: 'ESP-01', ip_address: '192.168.1.101', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 2, computer_name: 'ESP-02', ip_address: '192.168.1.102', status: ComputerStatus.IN_USE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 3, computer_name: 'VIP-01', ip_address: '192.168.1.201', status: ComputerStatus.ONLINE, is_remote_enabled: false, zone_id: 2 },
      { computer_id: 4, computer_name: 'STD-01', ip_address: '192.168.1.301', status: ComputerStatus.OFFLINE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 5, computer_name: 'CLOUD-01', ip_address: '192.168.1.501', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 5 }
    ]);

    // 7. Seed Games
    await safeSeed(db.Game, [
      { game_id: 1, name: 'Valorant', category_id: 1, cover_image_url: '', executable_path: 'C:\\Riot Games\\VALORANT.exe', is_remote_supported: true, is_available: true },
      { game_id: 2, name: 'Counter-Strike 2', category_id: 1, cover_image_url: '', executable_path: 'C:\\Steam\\cs2.exe', is_remote_supported: true, is_available: true },
      { game_id: 3, name: 'League of Legends', category_id: 2, cover_image_url: '', executable_path: 'C:\\Riot Games\\LeagueClient.exe', is_remote_supported: true, is_available: true },
      { game_id: 4, name: 'FC Online 4', category_id: 2, cover_image_url: '', executable_path: 'C:\\Garena\\FCO.exe', is_remote_supported: false, is_available: true },
      { game_id: 5, name: 'Cyberpunk 2077 RT', category_id: 3, cover_image_url: '', executable_path: 'C:\\Games\\Cyberpunk2077.exe', is_remote_supported: true, is_available: true }
    ]);

    // 8. Seed Service Items
    await safeSeed(db.ServiceItem, [
      { service_item_id: 1, name: 'Mì Trứng Bò Hầm ProGamer', price: 35000.00, stock_quantity: 50, is_available: true, category_id: 2 },
      { service_item_id: 2, name: 'Sting Dâu Ướp Lạnh', price: 15000.00, stock_quantity: 100, is_available: true, category_id: 1 },
      { service_item_id: 3, name: 'Cà Phê Muối Cháy Đêm', price: 25000.00, stock_quantity: 40, is_available: true, category_id: 1 },
      { service_item_id: 4, name: 'Combo Đêm 6 TIẾNG + Sting', price: 65000.00, stock_quantity: 999, is_available: true, category_id: 2 }
    ]);

    // 9. Seed Combo Packages
    await safeSeed(db.ComboPackage, [
      { combo_id: 1, name: 'Combo Đêm Xuyên Màn Đêm', price: 50000.00, duration_minutes: 360, allowed_tier: 1, is_active: true },
      { combo_id: 2, name: 'Combo Chiến Game 3H + Nước', price: 40000.00, duration_minutes: 180, allowed_tier: 1, is_active: true }
    ]);

    // 10. Seed Initial Financial Transactions
    try {
      const txnCount = await db.FinancialTransaction.count();
      if (txnCount === 0) {
        const memberCount = await db.Member.count();
        if (memberCount > 0) {
          await db.FinancialTransaction.bulkCreate([
            {
              type: TransactionType.INCOME,
              category: TransactionCategory.MEMBER_TOPUP,
              amount: 100000.00,
              description: 'Nạp tiền tài khoản hội viên tại quầy',
              used_by: 3,
              processed_by: 2,
              created_at: new Date()
            },
            {
              type: TransactionType.INCOME,
              category: TransactionCategory.SERVICE_SALE,
              amount: 50000.00,
              description: 'Thanh toán đơn hàng ẩm thực #1001',
              used_by: 4,
              processed_by: 2,
              created_at: new Date()
            }
          ], { ignoreDuplicates: true });
        }
      }
    } catch (e) {
      console.warn('[Seeder Warning] Skipping FinancialTransaction seed:', e.message);
    }

    console.log('✅ Database Seeding Completed Successfully.');
  } catch (error) {
    console.error('❌ Database Seeding Error:', error);
  }
};

module.exports = seedData;