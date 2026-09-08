// src/models/User.js
const { UserRole } = require('../constants/enums');

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
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.CUSTOMER,
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('ACTIVE', 'LOCKED', 'SUSPENDED'),
            allowNull: false,
            defaultValue: 'ACTIVE',
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'users',
        timestamps: false,
    });

    User.associate = (models) => {
        User.hasOne(models.Member, { foreignKey: 'member_id', as: 'memberProfile' });
    };

    return User;
};
