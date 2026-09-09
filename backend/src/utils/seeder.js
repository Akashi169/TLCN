const bcrypt = require('bcryptjs');
const { TRANSACTION_TYPES, TRANSACTION_CATEGORIES, PAYMENT_METHODS, TRANSACTION_STATUS } = require('./constants');

/**
 * Database Seeder Utility for NEXUS Cyber Management System
 * Populates clean, production-ready seed data into MySQL tables on sync.
 * DO NOT DELETE THIS FILE.
 */
const seedData = async (db) => {
  try {
    const hashedPassword = bcrypt.hashSync('123456', 10);

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

    // 5. Seed Computers / Fleet Machines & Hardware Specs
    const computerCount = await db.Computer.count();
    if (computerCount === 0) {
      const initialComputers = [
        {
          computer_name: 'ESP-01',
          status: 'ONLINE',
          zone_id: 1,
          cpu: 'Intel Core i9-14900K',
          cpu_specs: '24 Cores / 32 Threads @ 5.8GHz',
          ram: '64GB DDR5',
          ram_specs: '6000MHz CL30 Kingston Beast',
          gpu: 'RTX 4080 Super 16GB',
          gpu_edition: 'ASUS ROG Strix OC White',
          storage_type: 'SAN NVMe 10Gbps',
          storage_specs: 'iSCSI Boot + 2TB Writeback RAM',
          boot_image: 'Win11-Esports-Tournament-v3',
          cpu_temp: 54,
          gpu_temp: 52,
          fan_speed: '62%',
          san_ping: '0.24ms'
        },
        {
          computer_name: 'ESP-02',
          status: 'ONLINE',
          zone_id: 1,
          cpu: 'Intel Core i9-14900K',
          cpu_specs: '24 Cores / 32 Threads @ 5.8GHz',
          ram: '64GB DDR5',
          ram_specs: '6000MHz CL30 Kingston Beast',
          gpu: 'RTX 4080 Super 16GB',
          gpu_edition: 'ASUS ROG Strix OC White',
          storage_type: 'SAN NVMe 10Gbps',
          storage_specs: 'iSCSI Boot + 2TB Writeback RAM',
          boot_image: 'Win11-Esports-Tournament-v3',
          cpu_temp: 53,
          gpu_temp: 50,
          fan_speed: '60%',
          san_ping: '0.22ms'
        },
        {
          computer_name: 'VIP-01',
          status: 'ONLINE',
          zone_id: 2,
          cpu: 'Intel Core i7-14700K',
          cpu_specs: '20 Cores / 28 Threads @ 5.6GHz',
          ram: '32GB DDR5',
          ram_specs: '5600MHz Corsair Vengeance',
          gpu: 'RTX 4070 Ti Super 16GB',
          gpu_edition: 'MSI Gaming X Slim',
          storage_type: 'SAN NVMe 10Gbps',
          storage_specs: 'High Throughput Cache 1TB',
          boot_image: 'Win11-Pro-Cyber-v25.02',
          cpu_temp: 49,
          gpu_temp: 47,
          fan_speed: '50%',
          san_ping: '0.28ms'
        },
        {
          computer_name: 'VIP-02',
          status: 'RESERVED',
          zone_id: 2,
          cpu: 'Intel Core i7-14700K',
          cpu_specs: '20 Cores / 28 Threads @ 5.6GHz',
          ram: '32GB DDR5',
          ram_specs: '5600MHz Corsair Vengeance',
          gpu: 'RTX 4070 Ti Super 16GB',
          gpu_edition: 'MSI Gaming X Slim',
          storage_type: 'SAN NVMe 10Gbps',
          storage_specs: 'High Throughput Cache 1TB',
          boot_image: 'Win11-Pro-Cyber-v25.02',
          cpu_temp: 38,
          gpu_temp: 35,
          fan_speed: '30%',
          san_ping: '0.25ms'
        },
        {
          computer_name: 'STD-01',
          status: 'ONLINE',
          zone_id: 4,
          cpu: 'AMD Ryzen 9 7950X',
          cpu_specs: '16 Cores / 32 Threads @ 5.7GHz',
          ram: '64GB DDR5',
          ram_specs: '6000MHz G.Skill Trident Z5 Neo',
          gpu: 'RTX 4090 24GB',
          gpu_edition: 'Gigabyte AORUS Master Tri-Fan',
          storage_type: 'Dual NVMe 2TB PCIe 4.0',
          storage_specs: 'Direct SSD Capture + SAN Boot',
          boot_image: 'Win11-Creator-OBS-v25',
          cpu_temp: 58,
          gpu_temp: 55,
          fan_speed: '68%',
          san_ping: '0.19ms'
        },
        {
          computer_name: 'ST-01',
          status: 'ONLINE',
          zone_id: 3,
          cpu: 'Intel Core i5-13400F',
          cpu_specs: '10 Cores / 16 Threads @ 4.6GHz',
          ram: '32GB DDR4',
          ram_specs: '3200MHz Dual Channel TeamGroup',
          gpu: 'RTX 4060 8GB',
          gpu_edition: 'Zotac Gaming Twin Edge OC',
          storage_type: 'SAN NVMe 10Gbps',
          storage_specs: 'PXE High Speed Cluster Node',
          boot_image: 'Win11-Cyber-Standard-v2',
          cpu_temp: 44,
          gpu_temp: 42,
          fan_speed: '45%',
          san_ping: '0.31ms'
        },
        {
          computer_name: 'ST-02',
          status: 'MAINTENANCE',
          zone_id: 3,
          cpu: 'Intel Core i5-13400F',
          cpu_specs: '10 Cores / 16 Threads @ 4.6GHz',
          ram: '32GB DDR4',
          ram_specs: '3200MHz Dual Channel TeamGroup',
          gpu: 'RTX 4060 8GB',
          gpu_edition: 'Zotac Gaming Twin Edge OC',
          storage_type: 'SAN NVMe 10Gbps',
          storage_specs: 'PXE High Speed Cluster Node',
          boot_image: 'SAN Read Drop: Check Thermal',
          cpu_temp: 79,
          gpu_temp: 72,
          fan_speed: '95%',
          san_ping: '0.45ms'
        },
        {
          computer_name: 'CLOUD-01',
          status: 'ONLINE',
          zone_id: 5,
          cpu: 'AMD EPYC 7763',
          cpu_specs: '64 Cores / 128 Threads Hypervisor',
          ram: '128GB ECC Reg',
          ram_specs: 'Quad-Channel Server Grade',
          gpu: 'RTX 4090 Headless',
          gpu_edition: 'NVENC Cloud Virtual Gaming Grid',
          storage_type: '40Gbps Fiber SAN',
          storage_specs: 'Direct RDMA Ultra-low Latency',
          boot_image: 'WebRTC-vGPU-Hypervisor-v1',
          cpu_temp: 48,
          gpu_temp: 45,
          fan_speed: '55%',
          san_ping: '0.15ms'
        }
      ];

      // Add remaining standard PCs up to 20 machines
      for (let i = 3; i <= 15; i++) {
        const idStr = String(i).padStart(2, '0');
        if (!initialComputers.some(c => c.computer_name === `ST-${idStr}`)) {
          initialComputers.push({
            computer_name: `ST-${idStr}`,
            status: i % 4 === 0 ? 'OFFLINE' : i % 3 === 0 ? 'IN_USE' : 'ONLINE',
            zone_id: 3,
            cpu: 'Intel Core i5-13400F',
            cpu_specs: '10 Cores / 16 Threads @ 4.6GHz',
            ram: '32GB DDR4',
            ram_specs: '3200MHz Dual Channel',
            gpu: 'RTX 4060 8GB',
            gpu_edition: 'Zotac Gaming Twin Edge',
            storage_type: 'SAN NVMe 10Gbps',
            storage_specs: 'PXE High Speed Node',
            boot_image: 'Win11-Cyber-Standard-v2',
            cpu_temp: 42 + (i % 8),
            gpu_temp: 40 + (i % 6),
            fan_speed: '48%',
            san_ping: '0.28ms'
          });
        }
      }

      await db.Computer.bulkCreate(initialComputers);
    }

    // 6. Seed Default Users & Member Accounts (3 Roles: ADMIN, STAFF, CUSTOMER)
    const seedUsers = [
      { username: 'admin', full_name: 'Quản Trị Viên Hệ Thống', role: 'ADMIN', phone: '0901000000', email: 'admin@nexuscyber.com', status: 'ACTIVE' },
      { username: 'staff', full_name: 'Nhân Viên Thu Ngân A', role: 'STAFF', phone: '0902000000', email: 'staff.a@nexuscyber.com', status: 'ACTIVE' },
      { username: 'employee', full_name: 'Nhân Viên Thu Ngân B', role: 'STAFF', phone: '0903000000', email: 'staff.b@nexuscyber.com', status: 'ACTIVE' },
      { username: 'nam.nv', full_name: 'Nguyễn Văn Nam', role: 'CUSTOMER', balance: 485000, rankId: 3, points: 1450, phone: '0908123456', email: 'nam.nv@nexuscyber.com', status: 'ACTIVE', lastLogin: new Date('2026-09-08T14:30:00Z') },
      { username: 'long.hoang', full_name: 'Hoàng Long', role: 'CUSTOMER', balance: 1200000, rankId: 3, points: 3200, phone: '0912345678', email: 'long.hoang@nexuscyber.com', status: 'ACTIVE', lastLogin: new Date('2026-09-08T12:15:00Z') },
      { username: 'baotran99', full_name: 'Trần Quốc Bảo', role: 'CUSTOMER', balance: 65000, rankId: 1, points: 150, phone: '0987654321', email: 'baotran99@gmail.com', status: 'ACTIVE', lastLogin: new Date('2026-09-07T19:45:00Z') },
      { username: 'khoa_cyber', full_name: 'Lê Minh Khoa', role: 'CUSTOMER', balance: 15000, rankId: 1, points: 45, phone: '0933112233', email: 'khoa.cyber@gmail.com', status: 'SUSPENDED', lastLogin: new Date('2026-09-05T10:20:00Z') },
      { username: 'linh.stream', full_name: 'Phạm Thùy Linh', role: 'CUSTOMER', balance: 890000, rankId: 4, points: 8900, phone: '0977889900', email: 'linh.streamer@live.com', status: 'ACTIVE', lastLogin: new Date('2026-09-08T15:10:00Z') },
      { username: 'dang.dh', full_name: 'Đỗ Hải Đăng', role: 'CUSTOMER', balance: 0, rankId: 2, points: 0, phone: '0944556677', email: 'dang.dh@gmail.com', status: 'LOCKED', lastLogin: new Date('2026-08-30T08:00:00Z') },
      { username: 'customer', full_name: 'Khách Hàng VIP', role: 'CUSTOMER', balance: 500000, rankId: 3, points: 1500, phone: '0955667788', email: 'customer.vip@nexuscyber.com', status: 'ACTIVE', lastLogin: new Date('2026-09-08T11:00:00Z') },
      { username: 'user', full_name: 'Khách Hàng Thường', role: 'CUSTOMER', balance: 50000, rankId: 1, points: 100, phone: '0966778899', email: 'user.normal@nexuscyber.com', status: 'ACTIVE', lastLogin: new Date('2026-09-06T16:20:00Z') }
    ];

    for (const u of seedUsers) {
      const existingUser = await db.User.findOne({ where: { username: u.username } });
      if (!existingUser) {
        const newUser = await db.User.create({
          username: u.username,
          password: hashedPassword,
          full_name: u.full_name,
          role: u.role,
          phone_number: u.phone || null,
          email: u.email || null,
          status: u.status || 'ACTIVE',
          last_login: u.lastLogin || new Date()
        });

        if (u.role === 'CUSTOMER') {
          await db.Member.findOrCreate({
            where: { member_id: newUser.user_id },
            defaults: {
              member_id: newUser.user_id,
              real_balance: u.balance || 0,
              bonus_balance: Math.floor((u.balance || 0) * 0.1),
              rank_id: u.rankId || 1,
              points: u.points || 0
            }
          });
        }
      } else {
        // Ensure hashed password, status, and updated role
        existingUser.password = hashedPassword;
        if (u.phone) existingUser.phone_number = u.phone;
        if (u.email) existingUser.email = u.email;
        if (u.status) existingUser.status = u.status;
        if (u.lastLogin) existingUser.last_login = u.lastLogin;
        if (existingUser.role === 'MEMBER') existingUser.role = 'CUSTOMER';
        if (existingUser.role === 'EMPLOYEE') existingUser.role = 'STAFF';
        await existingUser.save();

        const member = await db.Member.findOne({ where: { member_id: existingUser.user_id } });
        if (member && u.points !== undefined) {
          member.points = u.points;
          await member.save();
        }
      }
    }

    // 7. Seed Promotion Campaigns
    if (db.Promotion) {
      const promoCount = await db.Promotion.count();
      if (promoCount === 0) {
        await db.Promotion.bulkCreate([
          {
            code: '#HH-WED-24',
            name: 'HAPPY HOUR - THỨ 4 BÙNG NỔ',
            description: 'Giảm giá giờ chơi khung giờ vàng 12h - 17h hàng tuần.',
            discount_type: 'PERCENTAGE',
            discount_value: 30.00,
            max_discount_amount: 50000.00,
            min_deposit_amount: null,
            start_date: '2024-10-01',
            end_date: '2024-12-31',
            schedule_note: 'Thứ 4 Hàng Tuần',
            target_audience: 'ALL',
            status: 'ACTIVE',
            budget_spent: 18500000.00,
            total_budget: 60000000.00,
            is_active: true
          },
          {
            code: '#TOPUP-50K',
            name: 'NẠP ĐẦU THÁNG - TẶNG NGAY 50K',
            description: 'Nạp từ 100k tặng thêm 50k vào tài khoản phụ chơi game.',
            discount_type: 'FIXED_AMOUNT',
            discount_value: 50000.00,
            max_discount_amount: null,
            min_deposit_amount: 100000.00,
            start_date: '2024-11-01',
            end_date: '2024-11-05',
            schedule_note: '5 ngày diễn ra',
            target_audience: 'NORMAL',
            status: 'UPCOMING',
            budget_spent: 0.00,
            total_budget: 60000000.00,
            is_active: true
          },
          {
            code: '#VIP-NEXUS-Q4',
            name: 'VIP BLACK CYBER TOURNAMENT',
            description: 'Giảm tiền trạm máy Zone Thi Đấu cho rank Kim Cương trở lên.',
            discount_type: 'PERCENTAGE',
            discount_value: 50.00,
            max_discount_amount: 100000.00,
            min_deposit_amount: null,
            start_date: '2024-10-15',
            end_date: '2024-12-15',
            schedule_note: 'Suốt Quý 4',
            target_audience: 'VIP',
            status: 'ACTIVE',
            budget_spent: 14200000.00,
            total_budget: 60000000.00,
            is_active: true
          },
          {
            code: '#COMBO-NIGHT',
            name: 'COMBO XUYÊN ĐÊM 10 Tiếng',
            description: 'Gói chơi game xuyên đêm từ 22h - 8h sáng hôm sau.',
            discount_type: 'COMBO',
            discount_value: 40000.00,
            max_discount_amount: null,
            min_deposit_amount: null,
            start_date: '2024-09-01',
            end_date: '2024-12-31',
            schedule_note: 'Hàng Đêm (22h - 8h)',
            target_audience: 'ALL',
            status: 'ACTIVE',
            budget_spent: 8100000.00,
            total_budget: 60000000.00,
            is_active: true
          },
          {
            code: '#FB-SNACK-20',
            name: 'ƯU ĐÃI F&B - GIẢM 20% ĐỒ UỐNG',
            description: 'Áp dụng cho tất cả đồ uống pha chế khi đặt qua máy.',
            discount_type: 'FOOD_BEVERAGE',
            discount_value: 20.00,
            max_discount_amount: 30000.00,
            min_deposit_amount: null,
            start_date: '2024-08-01',
            end_date: '2024-09-30',
            schedule_note: 'Đã hết hạn',
            target_audience: 'ALL',
            status: 'ENDED',
            budget_spent: 2000000.00,
            total_budget: 60000000.00,
            is_active: false
          }
        ]);
      }
    }

    // 8. Seed Financial Transactions (Audit Stream Ledger)
    if (db.FinancialTransaction) {
      const txnCount = await db.FinancialTransaction.count();
      if (txnCount === 0) {
        // Get member IDs from seeded users
        const namMember = await db.User.findOne({ where: { username: 'nam.nv' } });
        const longMember = await db.User.findOne({ where: { username: 'long.hoang' } });
        const baoMember = await db.User.findOne({ where: { username: 'baotran99' } });
        const linhMember = await db.User.findOne({ where: { username: 'linh.stream' } });
        const khoaMember = await db.User.findOne({ where: { username: 'khoa_cyber' } });

        await db.FinancialTransaction.bulkCreate([
          {
            txn_code: 'TXN-98421',
            type: TRANSACTION_TYPES.INCOME,
            category: TRANSACTION_CATEGORIES.COMBINED,
            amount: 145000.00,
            payment_method: PAYMENT_METHODS.VIETQR,
            status: TRANSACTION_STATUS.SUCCESS,
            member_id: namMember ? namMember.user_id : 4,
            computer_name: 'PC-VIP-04',
            staff_name: 'Thu Ngân A',
            notes: 'Nạp giờ chơi (100k) + Gọi Mì Ý Sốt Bò Bằm & Pepsi (45k)',
            created_at: new Date('2024-10-24T14:32:15Z')
          },
          {
            txn_code: 'TXN-98420',
            type: TRANSACTION_TYPES.INCOME,
            category: TRANSACTION_CATEGORIES.TOPUP,
            amount: 100000.00,
            payment_method: PAYMENT_METHODS.CASH,
            status: TRANSACTION_STATUS.SUCCESS,
            member_id: longMember ? longMember.user_id : 5,
            computer_name: 'PC-B12',
            staff_name: 'Thu Ngân A',
            notes: 'Nạp tiền giờ chơi tại quầy thu ngân',
            created_at: new Date('2024-10-24T14:28:04Z')
          },
          {
            txn_code: 'TXN-98419',
            type: TRANSACTION_TYPES.INCOME,
            category: TRANSACTION_CATEGORIES.SERVICE_FOOD,
            amount: 45000.00,
            payment_method: PAYMENT_METHODS.MOMO,
            status: TRANSACTION_STATUS.SUCCESS,
            member_id: baoMember ? baoMember.user_id : 6,
            computer_name: 'PC-A05',
            staff_name: 'Thu Ngân B',
            notes: 'Đơn F&B: 1 Cơm Chiên Dương Châu + 1 Trà Đào Sữa',
            created_at: new Date('2024-10-24T14:21:10Z')
          },
          {
            txn_code: 'TXN-98418',
            type: TRANSACTION_TYPES.INCOME,
            category: TRANSACTION_CATEGORIES.TOPUP,
            amount: 500000.00,
            payment_method: PAYMENT_METHODS.VIETQR,
            status: TRANSACTION_STATUS.SUCCESS,
            member_id: linhMember ? linhMember.user_id : 8,
            computer_name: 'PC-ST-01',
            staff_name: 'Hệ Thống Tự Động',
            notes: 'Nạp tiền tài khoản hội viên Streamer VIP',
            created_at: new Date('2024-10-24T13:45:00Z')
          },
          {
            txn_code: 'TXN-98417',
            type: TRANSACTION_TYPES.REFUND,
            category: TRANSACTION_CATEGORIES.OTHER,
            amount: 50000.00,
            payment_method: PAYMENT_METHODS.CASH,
            status: TRANSACTION_STATUS.REFUNDED,
            member_id: khoaMember ? khoaMember.user_id : 9,
            computer_name: 'PC-STD-01',
            staff_name: 'Quản Trị Viên',
            notes: 'Hoàn tiền dịch vụ do sự cố mất điện trạm máy ST-02',
            created_at: new Date('2024-10-24T12:10:30Z')
          }
        ]);
      }
    }

    console.log('✅ Synchronized Database & Successfully Seeded Financial Transaction Data!');
  } catch (error) {
    console.error('❌ Error during Seeder execution:', error);
  }
};

module.exports = seedData;