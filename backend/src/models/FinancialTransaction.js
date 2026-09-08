// src/models/FinancialTransaction.js
const { TransactionType, TransactionCategory } = require('../constants/enums');

module.exports = (sequelize, DataTypes) => {
    const FinancialTransaction = sequelize.define('FinancialTransaction', {
        transaction_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        type: { 
            type: DataTypes.ENUM(...Object.values(TransactionType)), 
            allowNull: false 
        },
        category: {
            type: DataTypes.ENUM(...Object.values(TransactionCategory)),
            allowNull: false,
            defaultValue: TransactionCategory.OTHER
        },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
        member_id: { type: DataTypes.INTEGER, allowNull: false },
        order_id: { type: DataTypes.INTEGER }
    }, { tableName: 'financial_transaction', timestamps: false });

    FinancialTransaction.associate = (models) => {
        FinancialTransaction.belongsTo(models.Member, { foreignKey: 'member_id' });
        FinancialTransaction.belongsTo(models.ServiceOrder, { foreignKey: 'order_id' });
    };

    return FinancialTransaction;
};