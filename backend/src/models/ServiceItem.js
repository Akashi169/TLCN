module.exports = (sequelize, DataTypes) => {
    const ServiceItem = sequelize.define('ServiceItem', {
        service_item_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        category_id: { type: DataTypes.INTEGER, allowNull: false }
    }, { tableName: 'service_item', timestamps: false });

    ServiceItem.associate = (models) => {
        ServiceItem.belongsTo(models.ServiceCategory, { foreignKey: 'category_id' });
        // Liên kết với bảng N-N thông qua model con để lấy quantity
        ServiceItem.hasMany(models.ComboServiceItem, { foreignKey: 'service_item_id' });
        ServiceItem.hasMany(models.ServiceOrderItem, { foreignKey: 'service_item_id' });
    };
    return ServiceItem;
};