module.exports = (sequelize, DataTypes) => {
    const ServiceOrderItem = sequelize.define('ServiceOrderItem', {
        order_id: { type: DataTypes.INTEGER, primaryKey: true },
        service_item_id: { type: DataTypes.INTEGER, primaryKey: true },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        item_name: { type: DataTypes.STRING(100), allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    }, { tableName: 'service_order_item', timestamps: false });

    ServiceOrderItem.associate = (models) => {
        ServiceOrderItem.belongsTo(models.ServiceOrder, { foreignKey: 'order_id' });
        ServiceOrderItem.belongsTo(models.ServiceItem, { foreignKey: 'service_item_id' });
    };
    return ServiceOrderItem;
};