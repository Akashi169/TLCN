module.exports = (sequelize, DataTypes) => {
    const ComboServiceItem = sequelize.define('ComboServiceItem', {
        combo_id: { type: DataTypes.INTEGER, primaryKey: true },
        service_item_id: { type: DataTypes.INTEGER, primaryKey: true },
        quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
    }, { tableName: 'combo_service_item', timestamps: false });

    ComboServiceItem.associate = (models) => {
        ComboServiceItem.belongsTo(models.ComboPackage, { foreignKey: 'combo_id' });
        ComboServiceItem.belongsTo(models.ServiceItem, { foreignKey: 'service_item_id' });
    };
    return ComboServiceItem;
};