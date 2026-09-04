module.exports = (sequelize, DataTypes) => {
    const ServiceOrder = sequelize.define('ServiceOrder', {
        order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        status: { type: DataTypes.STRING(50), allowNull: false },
        member_id: { type: DataTypes.INTEGER, allowNull: false },
        session_id: { type: DataTypes.INTEGER }
    }, { tableName: 'service_order', timestamps: false });

    ServiceOrder.associate = (models) => {
        ServiceOrder.belongsTo(models.Member, { foreignKey: 'member_id' });
        ServiceOrder.belongsTo(models.RentalSession, { foreignKey: 'session_id' });
        ServiceOrder.hasMany(models.ServiceOrderItem, { foreignKey: 'order_id' });
        ServiceOrder.hasMany(models.FinancialTransaction, { foreignKey: 'order_id' });
    };
    return ServiceOrder;
};