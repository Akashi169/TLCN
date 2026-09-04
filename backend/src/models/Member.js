// src/models/Member.js
// Đại diện cho bảng `members` - mở rộng của User với các thuộc tính riêng của khách hàng
// Sử dụng pattern Table Inheritance: member_id = user_id (shared primary key)
module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        member_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            // Không autoIncrement vì đây là FK trỏ tới users.user_id
        },
        real_balance: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0.00,
        },
        bonus_balance: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0.00,
        },
        rank_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'members',
        timestamps: false,
    });

    Member.associate = (models) => {
        // Quan hệ 1-1 ngược lại với User (parent)
        Member.belongsTo(models.User, { foreignKey: 'member_id', as: 'userInfo' });

        // Hạng thành viên
        Member.belongsTo(models.MembershipRank, { foreignKey: 'rank_id' });

        // Các phiên chơi của member
        Member.hasMany(models.RentalSession, { foreignKey: 'member_id' });

        // Các đơn hàng dịch vụ
        Member.hasMany(models.ServiceOrder, { foreignKey: 'member_id' });

        // Lịch sử giao dịch tài chính
        Member.hasMany(models.FinancialTransaction, { foreignKey: 'member_id' });
    };

    return Member;
};
