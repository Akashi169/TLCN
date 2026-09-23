const { Model, DataTypes } = require('sequelize');

class ComboItem extends Model {}

module.exports = (sequelize) => {
  ComboItem.init({
    combo_id: { type: DataTypes.INTEGER, primaryKey: true },
    service_item_id: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
  }, {
    sequelize,
    modelName: 'ComboItem',
    tableName: 'combo_item',
    timestamps: false
  });

  return ComboItem;
};
