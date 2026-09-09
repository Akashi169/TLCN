// src/models/FinancialTransaction.js
const { TRANSACTION_TYPES, TRANSACTION_CATEGORIES, PAYMENT_METHODS, TRANSACTION_STATUS } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
    const FinancialTransaction = sequelize.define('FinancialTransaction', {
        transaction_id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        txn_code: { 
            type: DataTypes.STRING(50), 
            allowNull: false, 
            unique: true 
            // KHÔNG dùng defaultValue ở DB layer để tránh lỗi trùng lặp Unique Constraint
        },
        type: { 
            type: DataTypes.STRING(30), 
            allowNull: false, 
            defaultValue: TRANSACTION_TYPES.INCOME 
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: TRANSACTION_CATEGORIES.TOPUP
        },
        amount: { 
            type: DataTypes.DECIMAL(15, 2), 
            allowNull: false, 
            defaultValue: 0.00 
        },
        payment_method: { 
            type: DataTypes.STRING(50), 
            allowNull: false, 
            defaultValue: PAYMENT_METHODS.CASH 
        },
        status: { 
            type: DataTypes.STRING(30), 
            allowNull: false, 
            defaultValue: TRANSACTION_STATUS.SUCCESS 
        },
        member_id: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        order_id: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        computer_name: { 
            type: DataTypes.STRING(50), 
            allowNull: true 
        },
        staff_name: { 
            type: DataTypes.STRING(100), 
            allowNull: true 
        },
        notes: { 
            type: DataTypes.TEXT, 
            allowNull: true 
        },
        created_at: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        }
    }, { 
        tableName: 'financial_transaction', 
        timestamps: false 
    });

    // Hook: Tự động sinh mã giao dịch duy nhất trước khi validate/lưu vào DB
    FinancialTransaction.beforeValidate((transaction) => {
        if (!transaction.txn_code) {
            const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
            transaction.txn_code = `TXN-${dateStr}-${randomCode}`;
        }
    });

    FinancialTransaction.associate = (models) => {
        FinancialTransaction.belongsTo(models.Member, { foreignKey: 'member_id', as: 'memberInfo' });
        FinancialTransaction.belongsTo(models.ServiceOrder, { foreignKey: 'order_id', as: 'serviceOrder' });
    };

    return FinancialTransaction;
};