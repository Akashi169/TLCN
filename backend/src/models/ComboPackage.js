const { Model, DataTypes } = require('sequelize');

class ComboPackage extends Model {}

module.exports = (sequelize) => {
  ComboPackage.init({
    combo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
    start_time_limit: { type: DataTypes.TIME },
    end_time_limit: { type: DataTypes.TIME },
    allowed_tier: { type: DataTypes.INTEGER },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'ComboPackage',
    tableName: 'combo_package',
    timestamps: false
  });

  ComboPackage.associate = (models) => {
    ComboPackage.belongsToMany(models.ServiceItem, { through: models.ComboItem, foreignKey: 'combo_id' });
  };

  return ComboPackage;
};