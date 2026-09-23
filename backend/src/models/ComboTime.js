const { Model, DataTypes } = require('sequelize');
const { ComboTimeStatus } = require('../constants/enums');

class ComboTime extends Model {}

module.exports = (sequelize) => {
  ComboTime.init({
    combo_time_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    start_time: { type: DataTypes.DATE },
    end_time: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM(...Object.values(ComboTimeStatus)), defaultValue: ComboTimeStatus.ACTIVE },
    allowed_tier: { type: DataTypes.INTEGER },
    order_id: { type: DataTypes.INTEGER, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'ComboTime',
    tableName: 'combo_time',
    timestamps: false
  });

  ComboTime.associate = (models) => {
    ComboTime.belongsTo(models.ServiceOrder, { foreignKey: 'order_id' });
  };

  return ComboTime;
};
