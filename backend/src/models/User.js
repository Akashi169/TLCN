// src/models/User.js
// Đại diện cho bảng `users` - lớp cha của tất cả người dùng hệ thống
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('ADMIN', 'EMPLOYEE', 'MEMBER'),
            allowNull: false,
        },
    }, {
        tableName: 'users',
        timestamps: false,
    });

    User.associate = (models) => {
        // Quan hệ 1-1: User MEMBER sẽ có 1 bản ghi Member tương ứng
        User.hasOne(models.Member, { foreignKey: 'member_id', as: 'memberProfile' });
    };

    return User;
};
