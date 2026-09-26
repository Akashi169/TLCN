const { Sequelize, DataTypes, Model } = require('sequelize');

// ==========================================
// 1. CẤU HÌNH KẾT NỐI DB & ENUMS
// ==========================================
const sequelize = new Sequelize('game_center_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const Enums = {
    UserRole: { ADMIN: 'ADMIN', EMPLOYEE: 'EMPLOYEE', MEMBER: 'MEMBER' },
    UserStatus: { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', LOCKED: 'LOCKED', BANNED: 'BANNED' },
    ComputerStatus: { ONLINE: 'ONLINE', OFFLINE: 'OFFLINE', IN_USE: 'IN_USE', LOCKED: 'LOCKED', MAINTENANCE: 'MAINTENANCE', PAUSE: 'PAUSE' },
    OrderStatus: { PENDING: 'PENDING', PREPARING: 'PREPARING', DELIVERED: 'DELIVERED', COMPLETED: 'COMPLETED', CANCELLED: 'CANCELLED' },
    PaymentStatus: { PAID: 'PAID', UNPAID: 'UNPAID' },
    TransactionType: { INCOME: 'INCOME', EXPENSE: 'EXPENSE' },
    TransactionCategory: { SERVICE_SALE: 'SERVICE_SALE', MEMBER_TOPUP: 'MEMBER_TOPUP', MEMBER_WITHDRAW: 'MEMBER_WITHDRAW', REFUND: 'REFUND', COMBO_PURCHASE: 'COMBO_PURCHASE', OTHER: 'OTHER' },
    SessionType: { LOCAL: 'LOCAL', REMOTE: 'REMOTE' },
    ComboTimeStatus: { ACTIVE: 'ACTIVE', EXPIRED: 'EXPIRED', CANCELLED: 'CANCELLED' }
};

// ==========================================
// 2. ĐỊNH NGHĨA CÁC CLASSES (MODELS) KÈM METHODS
// ==========================================

class MembershipRank extends Model {
    isEligible(point) {
        return point >= this.required_point;
    }
    calculateDiscount(amount) {
        return amount * (this.discount_percent / 100);
    }
}
MembershipRank.init({
    rank_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    required_point: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    rank_level: { type: DataTypes.INTEGER, allowNull: false },
    discount_percent: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0.00 }
}, { sequelize, modelName: 'MembershipRank', tableName: 'membership_rank', timestamps: false });

class PricingPlan extends Model {
    calculatePrice(minutes) { return (parseFloat(this.price_per_hour) / 60) * minutes; }
    activate() { this.is_active = true; return this.save(); }
    deactivate() { this.is_active = false; return this.save(); }
    updatePrice(newPrice) { this.price_per_hour = newPrice; return this.save(); }
    isApplicable(type, time, zoneId) { /* Logic kiểm tra điều kiện áp dụng */ return true; }
}
PricingPlan.init({
    pricing_plan_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    price_per_hour: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    plan_type: { type: DataTypes.ENUM(...Object.values(Enums.SessionType)), allowNull: false },
    priority: { type: DataTypes.INTEGER, defaultValue: 0 },
    start_time: { type: DataTypes.TIME },
    end_time: { type: DataTypes.TIME },
    apply_date: { type: DataTypes.DATEONLY },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { sequelize, modelName: 'PricingPlan', tableName: 'pricing_plan', timestamps: false });

class ComputerZone extends Model {
    async getAvailableComputers() {
        return await Computer.findAll({ where: { zone_id: this.zone_id, status: Enums.ComputerStatus.OFFLINE } });
    }
}
ComputerZone.init({
    zone_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    zone_name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    tier_level: { type: DataTypes.INTEGER, defaultValue: 1 }
}, { sequelize, modelName: 'ComputerZone', tableName: 'computer_zone', timestamps: false });

class ZonePricingPlan extends Model { }
ZonePricingPlan.init({
    zone_id: { type: DataTypes.INTEGER, primaryKey: true },
    pricing_plan_id: { type: DataTypes.INTEGER, primaryKey: true }
}, { sequelize, modelName: 'ZonePricingPlan', tableName: 'zone_pricing_plan', timestamps: false });

class ServiceCategory extends Model {
    rename(newName) { this.name = newName; return this.save(); }
}
ServiceCategory.init({
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false }
}, { sequelize, modelName: 'ServiceCategory', tableName: 'service_category', timestamps: false });

class GameCategory extends Model {
    async getGames() { return await Game.findAll({ where: { category_id: this.category_id } }); }
    rename(newName) { this.name = newName; return this.save(); }
}
GameCategory.init({
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false }
}, { sequelize, modelName: 'GameCategory', tableName: 'game_category', timestamps: false });

// --- QUẢN LÝ NGƯỜI DÙNG ---
class User extends Model {
    login(password) { /* Kiểm tra hash */ return true; }
    logout() { /* Xử lý phiên */ }
    changePassword(oldPass, newPass) { /* Logic đổi mk */ }
    isActive() { return this.status === Enums.UserStatus.ACTIVE; }
}
User.init({
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    full_name: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.ENUM(...Object.values(Enums.UserRole)), allowNull: false },
    status: { type: DataTypes.ENUM(...Object.values(Enums.UserStatus)), defaultValue: Enums.UserStatus.ACTIVE }
}, { sequelize, modelName: 'User', tableName: 'users', timestamps: false });

class Member extends Model {
    updateProfile(member) {
        this.phone = member.phone;
        this.id_number = member.id_number;
        return this.save();
    }
    topUp(amount, isBonus) {
        if (isBonus) this.bonus_balance = parseFloat(this.bonus_balance) + amount;
        else this.real_balance = parseFloat(this.real_balance) + amount;
        return this.save();
    }
    withdraw(amount) { this.real_balance -= amount; return this.save(); }
    addPoint(point) { this.point += point; return this.save(); }
    deductPoint(point) { this.point -= point; return this.save(); }
    deductRealBalance(amount) { this.real_balance -= amount; return this.save(); }
    deductBonusBalance(amount) { this.bonus_balance -= amount; return this.save(); }
    changeRank(newRank) { this.rank_id = newRank.rank_id; return this.save(); }
    canPay(amount) { return (parseFloat(this.real_balance) + parseFloat(this.bonus_balance)) >= amount; }
}
Member.init({
    member_id: { type: DataTypes.INTEGER, primaryKey: true },
    id_number: { type: DataTypes.STRING(50) },
    phone: { type: DataTypes.STRING(20) },
    real_balance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
    bonus_balance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
    point: { type: DataTypes.INTEGER, defaultValue: 0 },
    rank_id: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'Member', tableName: 'members', timestamps: false });

// --- QUẢN LÝ MÁY TÍNH & GAME ---
class Computer extends Model {
    updateStatus(newStatus) { this.status = newStatus; return this.save(); }
    lock() { this.status = Enums.ComputerStatus.LOCKED; return this.save(); }
    unlock() { this.status = Enums.ComputerStatus.OFFLINE; return this.save(); }
    restart() { /* Gọi API phần cứng/client */ }
    shutdown() { /* Gọi API phần cứng/client */ }
    pause() { this.status = Enums.ComputerStatus.PAUSE; return this.save(); }
    resume() { this.status = Enums.ComputerStatus.IN_USE; return this.save(); }
    sendNotification(message) { /* Logic gửi tin nhắn xuống máy trạm */ }
    setMaintenance() { this.status = Enums.ComputerStatus.MAINTENANCE; return this.save(); }
    removeMaintenance() { this.status = Enums.ComputerStatus.OFFLINE; return this.save(); }
    isAvailable() { return this.status === Enums.ComputerStatus.OFFLINE; }
}
Computer.init({
    computer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    computer_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    ip_address: { type: DataTypes.STRING(50) },
    status: { type: DataTypes.ENUM(...Object.values(Enums.ComputerStatus)), defaultValue: Enums.ComputerStatus.OFFLINE },
    is_remote_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    zone_id: { type: DataTypes.INTEGER, allowNull: false } // FK sinh ra từ Association
}, { sequelize, modelName: 'Computer', tableName: 'computer', timestamps: false });

class ComputerStatusLog extends Model {
    static async createLog(computerId, memberId, status, sessionType) {
        return await ComputerStatusLog.create({ computer_id: computerId, member_id: memberId, status, session_type: sessionType });
    }
    getRecordedAt() { return this.recorded_at; }
}
ComputerStatusLog.init({
    log_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    computer_id: { type: DataTypes.INTEGER, allowNull: false },
    member_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.ENUM(...Object.values(Enums.ComputerStatus)), allowNull: false },
    session_type: { type: DataTypes.ENUM(...Object.values(Enums.SessionType)) },
}, { sequelize, modelName: 'ComputerStatusLog', tableName: 'computer_status_log', timestamps: true, createdAt: 'recorded_at', updatedAt: false });

class Game extends Model {
    updateInfo(name, image) { this.name = name; this.cover_image_url = image; return this.save(); }
    updatePath(newPath) { this.executable_path = newPath; return this.save(); }
    toggleAvailability() { this.is_available = !this.is_available; return this.save(); }
    async getCategory() { return await GameCategory.findByPk(this.category_id); }
}
Game.init({
    game_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    cover_image_url: { type: DataTypes.STRING(255) },
    executable_path: { type: DataTypes.STRING(255) },
    is_remote_supported: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
    category_id: { type: DataTypes.INTEGER, allowNull: false } // FK sinh ra từ Association
}, { sequelize, modelName: 'Game', tableName: 'game', timestamps: false });

class ComputerGame extends Model { }
ComputerGame.init({
    computer_id: { type: DataTypes.INTEGER, primaryKey: true },
    game_id: { type: DataTypes.INTEGER, primaryKey: true }
}, { sequelize, modelName: 'ComputerGame', tableName: 'computer_game', timestamps: false });

// --- QUẢN LÝ DỊCH VỤ & COMBO ---
class ServiceItem extends Model {
    updateInfo(newName) { this.name = newName; return this.save(); }
    updatePrice(newPrice) { this.price = newPrice; return this.save(); }
    adjustStock(quantity) { this.stock_quantity += quantity; return this.save(); }
    isAvailable() { return this.is_available && this.stock_quantity > 0; }
    calculateFinalPrice(customerRank) {
        if (customerRank && customerRank.rank_level >= this.min_discount_rank) {
            return this.price - customerRank.calculateDiscount(this.price);
        }
        return this.price;
    }
}
ServiceItem.init({
    service_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
    min_discount_rank: { type: DataTypes.INTEGER },
    category_id: { type: DataTypes.INTEGER, allowNull: false } // FK sinh ra từ Association
}, { sequelize, modelName: 'ServiceItem', tableName: 'service_item', timestamps: false });

class ComboPackage extends Model {
    isTimeValid(currentTime) { /* So sánh với startTimeLimit và endTimeLimit */ return true; }
    canApplyToZone(zoneTier) { return zoneTier >= this.allowed_tier; }
    async getComboItems() { return await ComboItem.findAll({ where: { combo_id: this.combo_id } }); }
    updateInfo(price, duration, isActive) {
        this.price = price; this.duration_minutes = duration; this.is_active = isActive; return this.save();
    }
}
ComboPackage.init({
    combo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
    start_time_limit: { type: DataTypes.TIME },
    end_time_limit: { type: DataTypes.TIME },
    allowed_tier: { type: DataTypes.INTEGER },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { sequelize, modelName: 'ComboPackage', tableName: 'combo_package', timestamps: false });

class ComboItem extends Model {
    async getServiceItem() { return await ServiceItem.findByPk(this.service_item_id); }
    getQuantity() { return this.quantity; }
}
ComboItem.init({
    combo_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Theo sơ đồ mới có thuộc tính này
    combo_id: { type: DataTypes.INTEGER, allowNull: false }, // Khóa ngoại
    service_item_id: { type: DataTypes.INTEGER, allowNull: false }, // Khóa ngoại
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
}, { sequelize, modelName: 'ComboItem', tableName: 'combo_item', timestamps: false });

// --- ĐƠN HÀNG, GIAO DỊCH & THỜI GIAN CHƠI ---
class ServiceOrder extends Model {
    addOrderItem(item, quantity) { /* Xử lý logic tạo ServiceOrderItem */ }
    attachComboTime(comboTime) { /* Liên kết comboTime với order */ }
    calculateTotal() { /* Tính tổng giá trị từ các ServiceOrderItem */ return 0; }
    submit() { this.status = Enums.OrderStatus.PREPARING; return this.save(); }
    updateStatus(newStatus) { this.status = newStatus; return this.save(); }
    cancel() { this.status = Enums.OrderStatus.CANCELLED; return this.save(); }
}
ServiceOrder.init({
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.ENUM(...Object.values(Enums.OrderStatus)), defaultValue: Enums.OrderStatus.PENDING },
    payment_status: { type: DataTypes.ENUM(...Object.values(Enums.PaymentStatus)), defaultValue: Enums.PaymentStatus.UNPAID },
    used_by: { type: DataTypes.INTEGER, allowNull: false }, // orderedBy relation
    processed_by: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'ServiceOrder', tableName: 'service_order', timestamps: true, createdAt: 'created_at', updatedAt: false });

class ServiceOrderItem extends Model {
    calculateSubtotal() { return this.quantity * this.price; }
    async getOriginalItem() { return await ServiceItem.findByPk(this.service_item_id); }
}
ServiceOrderItem.init({
    order_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Có ID riêng theo sơ đồ mới
    order_id: { type: DataTypes.INTEGER, allowNull: false }, // Khóa ngoại
    service_item_id: { type: DataTypes.INTEGER, allowNull: false }, // Khóa ngoại
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    item_name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { sequelize, modelName: 'ServiceOrderItem', tableName: 'service_order_item', timestamps: false });

class ComboTime extends Model {
    isActive() { return this.status === Enums.ComboTimeStatus.ACTIVE; }
    markExpired() { this.status = Enums.ComboTimeStatus.EXPIRED; return this.save(); }
    cancel() { this.status = Enums.ComboTimeStatus.CANCELLED; return this.save(); }
    calculateRemainingMinutes() { /* Logic tính thời gian còn lại */ return 0; }
    isValidForZone() { /* Trả về boolean */ return true; }
    extendEndTime(minutes) { /* Logic cộng thêm phút vào endTime */ return this.save(); }
}
ComboTime.init({
    combo_time_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    start_time: { type: DataTypes.DATE },
    end_time: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM(...Object.values(Enums.ComboTimeStatus)), defaultValue: Enums.ComboTimeStatus.ACTIVE },
    allowed_tier: { type: DataTypes.INTEGER },
    order_id: { type: DataTypes.INTEGER, allowNull: false, unique: true }
}, { sequelize, modelName: 'ComboTime', tableName: 'combo_time', timestamps: false });

class FinancialTransaction extends Model {
    record() { /* Logic lưu giao dịch */ return this.save(); }
    cancel() { this.type = Enums.TransactionCategory.REFUND; return this.save(); }
    getSignedAmount() { return this.type === Enums.TransactionType.EXPENSE ? -this.amount : this.amount; }
}
FinancialTransaction.init({
    transaction_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.ENUM(...Object.values(Enums.TransactionType)), allowNull: false },
    category: { type: DataTypes.ENUM(...Object.values(Enums.TransactionCategory)), allowNull: false },
    amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    description: { type: DataTypes.TEXT },
    used_by: { type: DataTypes.INTEGER, allowNull: false },
    processed_by: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'FinancialTransaction', tableName: 'financial_transaction', timestamps: true, createdAt: 'created_at', updatedAt: false });


// ==========================================
// 3. THIẾT LẬP MỐI QUAN HỆ (ASSOCIATIONS)
// ==========================================

// Kế thừa User - Member (1-1)
User.hasOne(Member, { foreignKey: 'member_id', onDelete: 'CASCADE' });
Member.belongsTo(User, { foreignKey: 'member_id' });

// MembershipRank & Member (1-N)
MembershipRank.hasMany(Member, { foreignKey: 'rank_id' });
Member.belongsTo(MembershipRank, { foreignKey: 'rank_id' });

// Zone & Pricing Plan (N-N)
ComputerZone.belongsToMany(PricingPlan, { through: ZonePricingPlan, foreignKey: 'zone_id' });
PricingPlan.belongsToMany(ComputerZone, { through: ZonePricingPlan, foreignKey: 'pricing_plan_id' });

// Zone & Computer (1-N)
ComputerZone.hasMany(Computer, { foreignKey: 'zone_id' });
Computer.belongsTo(ComputerZone, { foreignKey: 'zone_id' });

// Category & Game (1-N)
GameCategory.hasMany(Game, { foreignKey: 'category_id' });
Game.belongsTo(GameCategory, { foreignKey: 'category_id' });

// Computer & Game (N-N)
Computer.belongsToMany(Game, { through: ComputerGame, foreignKey: 'computer_id' });
Game.belongsToMany(Computer, { through: ComputerGame, foreignKey: 'game_id' });

// Logs
Computer.hasMany(ComputerStatusLog, { foreignKey: 'computer_id' });
ComputerStatusLog.belongsTo(Computer, { foreignKey: 'computer_id' });
Member.hasMany(ComputerStatusLog, { foreignKey: 'member_id' });
ComputerStatusLog.belongsTo(Member, { foreignKey: 'member_id' });

// Service Category & Items
ServiceCategory.hasMany(ServiceItem, { foreignKey: 'category_id' });
ServiceItem.belongsTo(ServiceCategory, { foreignKey: 'category_id' });
MembershipRank.hasMany(ServiceItem, { foreignKey: 'min_discount_rank' });
ServiceItem.belongsTo(MembershipRank, { foreignKey: 'min_discount_rank' });

// Combo & ComboItem (Composition 1 - N)
ComboPackage.hasMany(ComboItem, { foreignKey: 'combo_id', onDelete: 'CASCADE' });
ComboItem.belongsTo(ComboPackage, { foreignKey: 'combo_id' });
ServiceItem.hasMany(ComboItem, { foreignKey: 'service_item_id' });
ComboItem.belongsTo(ServiceItem, { foreignKey: 'service_item_id' });

// Order & Items (Composition 1 - N)
ServiceOrder.hasMany(ServiceOrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
ServiceOrderItem.belongsTo(ServiceOrder, { foreignKey: 'order_id' });
ServiceItem.hasMany(ServiceOrderItem, { foreignKey: 'service_item_id' });
ServiceOrderItem.belongsTo(ServiceItem, { foreignKey: 'service_item_id' });

// Order & ComboTime (Composition 1 - 1)
ServiceOrder.hasOne(ComboTime, { foreignKey: 'order_id', onDelete: 'CASCADE' });
ComboTime.belongsTo(ServiceOrder, { foreignKey: 'order_id' });

// Orders Users Relationships
Member.hasMany(ServiceOrder, { foreignKey: 'used_by' }); // orderedBy
ServiceOrder.belongsTo(Member, { foreignKey: 'used_by' });
User.hasMany(ServiceOrder, { foreignKey: 'processed_by' }); // processedOrders
ServiceOrder.belongsTo(User, { foreignKey: 'processed_by' });

// Transactions
Member.hasMany(FinancialTransaction, { foreignKey: 'used_by' }); // usedBy
FinancialTransaction.belongsTo(Member, { foreignKey: 'used_by' });
User.hasMany(FinancialTransaction, { foreignKey: 'processed_by' }); // processedBy
FinancialTransaction.belongsTo(User, { foreignKey: 'processed_by' });

module.exports = {
    sequelize, Enums, MembershipRank, PricingPlan, ComputerZone, ZonePricingPlan,
    ServiceCategory, GameCategory, User, Member, Computer, ComputerStatusLog, Game,
    ComputerGame, ServiceItem, ComboPackage, ComboItem, ServiceOrder, ServiceOrderItem,
    ComboTime, FinancialTransaction
};