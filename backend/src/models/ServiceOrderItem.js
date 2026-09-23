const { Model, DataTypes } = require('sequelize');

class ServiceOrderItem extends Model {}

module.exports = (sequelize) => {
  ServiceOrderItem.init({
    order_id: { type: DataTypes.INTEGER, primaryKey: true },
    service_item_id: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    item_name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
  }, {
    sequelize,
    modelName: 'ServiceOrderItem',
    tableName: 'service_order_item',
    timestamps: false
  });

  return ServiceOrderItem;
};