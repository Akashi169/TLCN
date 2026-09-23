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

    // Helper for safe seeding: inserts missing items without failing if some exist
    const safeSeed = async (model, data) => {
      try {
        await model.bulkCreate(data, { ignoreDuplicates: true });
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
      { zone_id: 1, zone_name: 'Zone 1: Esports Pro Arena', description: 'Máy thi đấu 360Hz BenQ ZOWIE, CPU i9 14900K, RTX 4080', tier_level: 2 },
      { zone_id: 2, zone_name: 'Zone 2: VIP Gaming Suite', description: 'Phòng VIP riêng biệt, ghế da cao cấp, RTX 4070 Ti Super', tier_level: 2 },
      { zone_id: 3, zone_name: 'Zone 3: Tiêu Chuẩn Combat', description: 'Khu vực phổ thông i5 14400F, RTX 4060, Màn 240Hz', tier_level: 1 },
      { zone_id: 4, zone_name: 'Zone 4: Stream Studio', description: 'Phòng Studio cách âm, Cam 4K, GoXLR, RTX 4090 24GB', tier_level: 3 },
      { zone_id: 5, zone_name: 'Zone 5: Cloud Remote Nodes', description: 'Cụm Cloud vGPU stream WebRTC 1.1ms AV1 Dual EPYC', tier_level: 4 }
    ]);

    // Seed Zone Pricing Plan relationships safely
    try {
      const links = [
        { zone_id: 1, pricing_plan_id: 2 },
        { zone_id: 2, pricing_plan_id: 2 },
        { zone_id: 3, pricing_plan_id: 1 },
        { zone_id: 4, pricing_plan_id: 3 },
        { zone_id: 5, pricing_plan_id: 4 }
      ];
      await db.ZonePricingPlan.bulkCreate(links, { ignoreDuplicates: true });
    } catch (e) {
      console.warn('[Seeder Warning] Skipping ZonePricingPlan seed:', e.message);
    }

    // 5. Seed Users & Members
    try {
      await safeSeed(db.User, [
        { user_id: 1, username: 'admin', password_hash: hashedPassword, full_name: 'Quản Trị Viên Hệ Thống', role: UserRole.ADMIN, status: UserStatus.ACTIVE },
        { user_id: 2, username: 'staff1', password_hash: hashedPassword, full_name: 'Nguyễn Văn Thu Ngân', role: UserRole.EMPLOYEE, status: UserStatus.ACTIVE },
        { user_id: 3, username: 'customer1', password_hash: hashedPassword, full_name: 'Trần Văn ProGamer', role: UserRole.MEMBER, status: UserStatus.ACTIVE },
        { user_id: 4, username: 'customer2', password_hash: hashedPassword, full_name: 'Lê Thị VIP', role: UserRole.MEMBER, status: UserStatus.ACTIVE },
        { user_id: 5, username: 'customer3', password_hash: hashedPassword, full_name: 'Hoàng Lâm Streamer', role: UserRole.MEMBER, status: UserStatus.ACTIVE },
        { user_id: 6, username: 'customer4', password_hash: hashedPassword, full_name: 'Phạm Minh Tuấn', role: UserRole.MEMBER, status: UserStatus.ACTIVE },
        { user_id: 7, username: 'customer5', password_hash: hashedPassword, full_name: 'Đặng Bảo Nam', role: UserRole.MEMBER, status: UserStatus.ACTIVE }
      ]);

      await safeSeed(db.Member, [
        { member_id: 3, id_number: '079200012345', phone: '0901234567', real_balance: 150000.00, bonus_balance: 50000.00, point: 1200, rank_id: 2 },
        { member_id: 4, id_number: '079200054321', phone: '0987654321', real_balance: 500000.00, bonus_balance: 100000.00, point: 3500, rank_id: 4 },
        { member_id: 5, id_number: '079200088888', phone: '0912345678', real_balance: 300000.00, bonus_balance: 20000.00, point: 2100, rank_id: 3 },
        { member_id: 6, id_number: '079200099999', phone: '0933445566', real_balance: 80000.00, bonus_balance: 10000.00, point: 450, rank_id: 1 },
        { member_id: 7, id_number: '079200077777', phone: '0977889900', real_balance: 220000.00, bonus_balance: 30000.00, point: 1800, rank_id: 3 }
      ]);
    } catch (e) {
      console.warn('[Seeder Warning] Skipping User/Member seed:', e.message);
    }

    // 6. Seed Computers (Rich set of 36 computers with MAC addresses)
    await safeSeed(db.Computer, [
      // Zone 1: Esports Pro Arena (8 trạm)
      { computer_id: 1, computer_name: 'ESP-01', ip_address: '192.168.1.101', mac_address: 'F4:D4:88:5A:01:01', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 2, computer_name: 'ESP-02', ip_address: '192.168.1.102', mac_address: 'F4:D4:88:5A:01:02', status: ComputerStatus.IN_USE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 3, computer_name: 'ESP-03', ip_address: '192.168.1.103', mac_address: 'F4:D4:88:5A:01:03', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 4, computer_name: 'ESP-04', ip_address: '192.168.1.104', mac_address: 'F4:D4:88:5A:01:04', status: ComputerStatus.IN_USE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 5, computer_name: 'ESP-05', ip_address: '192.168.1.105', mac_address: 'F4:D4:88:5A:01:05', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 6, computer_name: 'ESP-06', ip_address: '192.168.1.106', mac_address: 'F4:D4:88:5A:01:06', status: ComputerStatus.IN_USE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 7, computer_name: 'ESP-07', ip_address: '192.168.1.107', mac_address: 'F4:D4:88:5A:01:07', status: ComputerStatus.MAINTENANCE, is_remote_enabled: true, zone_id: 1 },
      { computer_id: 8, computer_name: 'ESP-08', ip_address: '192.168.1.108', mac_address: 'F4:D4:88:5A:01:08', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 1 },

      // Zone 2: VIP Gaming Suite (8 trạm)
      { computer_id: 9, computer_name: 'VIP-01', ip_address: '192.168.1.201', mac_address: 'F4:D4:88:5A:02:01', status: ComputerStatus.ONLINE, is_remote_enabled: false, zone_id: 2 },
      { computer_id: 10, computer_name: 'VIP-02', ip_address: '192.168.1.202', mac_address: 'F4:D4:88:5A:02:02', status: ComputerStatus.IN_USE, is_remote_enabled: false, zone_id: 2 },
      { computer_id: 11, computer_name: 'VIP-03', ip_address: '192.168.1.203', mac_address: 'F4:D4:88:5A:02:03', status: ComputerStatus.LOCKED, is_remote_enabled: false, zone_id: 2 },
      { computer_id: 12, computer_name: 'VIP-04', ip_address: '192.168.1.204', mac_address: 'F4:D4:88:5A:02:04', status: ComputerStatus.IN_USE, is_remote_enabled: false, zone_id: 2 },
      { computer_id: 13, computer_name: 'VIP-05', ip_address: '192.168.1.205', mac_address: 'F4:D4:88:5A:02:05', status: ComputerStatus.ONLINE, is_remote_enabled: false, zone_id: 2 },
      { computer_id: 14, computer_name: 'VIP-06', ip_address: '192.168.1.206', mac_address: 'F4:D4:88:5A:02:06', status: ComputerStatus.IN_USE, is_remote_enabled: false, zone_id: 2 },
      { computer_id: 15, computer_name: 'VIP-07', ip_address: '192.168.1.207', mac_address: 'F4:D4:88:5A:02:07', status: ComputerStatus.ONLINE, is_remote_enabled: false, zone_id: 2 },
      { computer_id: 16, computer_name: 'VIP-08', ip_address: '192.168.1.208', mac_address: 'F4:D4:88:5A:02:08', status: ComputerStatus.OFFLINE, is_remote_enabled: false, zone_id: 2 },

      // Zone 3: Tiêu Chuẩn Combat (10 trạm)
      { computer_id: 17, computer_name: 'STD-01', ip_address: '192.168.1.301', mac_address: 'F4:D4:88:5A:03:01', status: ComputerStatus.OFFLINE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 18, computer_name: 'STD-02', ip_address: '192.168.1.302', mac_address: 'F4:D4:88:5A:03:02', status: ComputerStatus.ONLINE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 19, computer_name: 'STD-03', ip_address: '192.168.1.303', mac_address: 'F4:D4:88:5A:03:03', status: ComputerStatus.IN_USE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 20, computer_name: 'STD-04', ip_address: '192.168.1.304', mac_address: 'F4:D4:88:5A:03:04', status: ComputerStatus.ONLINE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 21, computer_name: 'STD-05', ip_address: '192.168.1.305', mac_address: 'F4:D4:88:5A:03:05', status: ComputerStatus.IN_USE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 22, computer_name: 'STD-06', ip_address: '192.168.1.306', mac_address: 'F4:D4:88:5A:03:06', status: ComputerStatus.MAINTENANCE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 23, computer_name: 'STD-07', ip_address: '192.168.1.307', mac_address: 'F4:D4:88:5A:03:07', status: ComputerStatus.OFFLINE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 24, computer_name: 'STD-08', ip_address: '192.168.1.308', mac_address: 'F4:D4:88:5A:03:08', status: ComputerStatus.ONLINE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 25, computer_name: 'STD-09', ip_address: '192.168.1.309', mac_address: 'F4:D4:88:5A:03:09', status: ComputerStatus.IN_USE, is_remote_enabled: false, zone_id: 3 },
      { computer_id: 26, computer_name: 'STD-10', ip_address: '192.168.1.310', mac_address: 'F4:D4:88:5A:03:10', status: ComputerStatus.ONLINE, is_remote_enabled: false, zone_id: 3 },

      // Zone 4: Stream Studio (4 trạm)
      { computer_id: 27, computer_name: 'STR-01', ip_address: '192.168.1.401', mac_address: 'F4:D4:88:5A:04:01', status: ComputerStatus.IN_USE, is_remote_enabled: true, zone_id: 4 },
      { computer_id: 28, computer_name: 'STR-02', ip_address: '192.168.1.402', mac_address: 'F4:D4:88:5A:04:02', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 4 },
      { computer_id: 29, computer_name: 'STR-03', ip_address: '192.168.1.403', mac_address: 'F4:D4:88:5A:04:03', status: ComputerStatus.IN_USE, is_remote_enabled: true, zone_id: 4 },
      { computer_id: 30, computer_name: 'STR-04', ip_address: '192.168.1.404', mac_address: 'F4:D4:88:5A:04:04', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 4 },

      // Zone 5: Cloud Remote Nodes (6 trạm)
      { computer_id: 31, computer_name: 'CLOUD-01', ip_address: '192.168.1.501', mac_address: 'F4:D4:88:5A:05:01', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 5 },
      { computer_id: 32, computer_name: 'CLOUD-02', ip_address: '192.168.1.502', mac_address: 'F4:D4:88:5A:05:02', status: ComputerStatus.IN_USE, is_remote_enabled: true, zone_id: 5 },
      { computer_id: 33, computer_name: 'CLOUD-03', ip_address: '192.168.1.503', mac_address: 'F4:D4:88:5A:05:03', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 5 },
      { computer_id: 34, computer_name: 'CLOUD-04', ip_address: '192.168.1.504', mac_address: 'F4:D4:88:5A:05:04', status: ComputerStatus.IN_USE, is_remote_enabled: true, zone_id: 5 },
      { computer_id: 35, computer_name: 'CLOUD-05', ip_address: '192.168.1.505', mac_address: 'F4:D4:88:5A:05:05', status: ComputerStatus.REMOTE, is_remote_enabled: true, zone_id: 5 },
      { computer_id: 36, computer_name: 'CLOUD-06', ip_address: '192.168.1.506', mac_address: 'F4:D4:88:5A:05:06', status: ComputerStatus.ONLINE, is_remote_enabled: true, zone_id: 5 }
    ]);

    // Seed Status Logs for active machines
    await safeSeed(db.ComputerStatusLog, [
      { computer_id: 2, member_id: 3, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 45 * 60 * 1000), notes: 'Valorant Ranked' },
      { computer_id: 4, member_id: 4, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 120 * 60 * 1000), notes: 'Counter-Strike 2' },
      { computer_id: 6, member_id: 5, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 35 * 60 * 1000), notes: 'League of Legends' },
      { computer_id: 10, member_id: 6, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 90 * 60 * 1000), notes: 'FC Online 4' },
      { computer_id: 12, member_id: 7, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 50 * 60 * 1000), notes: 'Cyberpunk 2077 RT' },
      { computer_id: 14, member_id: 3, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 15 * 60 * 1000), notes: 'Dota 2 Ranked' },
      { computer_id: 19, member_id: 4, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 75 * 60 * 1000), notes: 'Grand Theft Auto V' },
      { computer_id: 21, member_id: 6, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 110 * 60 * 1000), notes: 'Apex Legends' },
      { computer_id: 25, member_id: 7, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 40 * 60 * 1000), notes: 'PUBG Battlegrounds' },
      { computer_id: 27, member_id: 5, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 180 * 60 * 1000), notes: 'OBS 4K Stream • Cyberpunk 2077 RT' },
      { computer_id: 29, member_id: 4, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 65 * 60 * 1000), notes: 'VTuber Live Stream' },
      { computer_id: 32, member_id: 3, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 25 * 60 * 1000), notes: 'Cloud Stream WebRTC' },
      { computer_id: 34, member_id: 6, status: ComputerStatus.IN_USE, session_type: SessionType.MEMBER, start_time: new Date(Date.now() - 85 * 60 * 1000), notes: 'Elden Ring Shadow of Erdtree' }
    ]);

    // 7. Seed Games
    await safeSeed(db.Game, [
      { game_id: 1, name: 'Valorant', category_id: 1, cover_image_url: '', executable_path: 'C:\\Riot Games\\VALORANT.exe', is_remote_supported: true, is_available: true },
      { game_id: 2, name: 'Counter-Strike 2', category_id: 1, cover_image_url: '', executable_path: 'C:\\Steam\\cs2.exe', is_remote_supported: true, is_available: true },
      { game_id: 3, name: 'League of Legends', category_id: 2, cover_image_url: '', executable_path: 'C:\\Riot Games\\LeagueClient.exe', is_remote_supported: true, is_available: true },
      { game_id: 4, name: 'FC Online 4', category_id: 2, cover_image_url: '', executable_path: 'C:\\Garena\\FCO.exe', is_remote_supported: false, is_available: true },
      { game_id: 5, name: 'Cyberpunk 2077 RT', category_id: 3, cover_image_url: '', executable_path: 'C:\\Games\\Cyberpunk2077.exe', is_remote_supported: true, is_available: true },
      { game_id: 6, name: 'Grand Theft Auto V', category_id: 3, cover_image_url: '', executable_path: 'C:\\Games\\GTAV.exe', is_remote_supported: true, is_available: true },
      { game_id: 7, name: 'Apex Legends', category_id: 1, cover_image_url: '', executable_path: 'C:\\Steam\\Apex.exe', is_remote_supported: true, is_available: true }
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

    console.log('✅ Database Seeding Completed Successfully.');
  } catch (error) {
    console.error('❌ Database Seeding Error:', error);
  }
};

module.exports = seedData;