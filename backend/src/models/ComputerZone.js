const { Model, DataTypes } = require('sequelize');

class ComputerZone extends Model {}

module.exports = (sequelize) => {
  ComputerZone.init({
    zone_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    zone_name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    tier_level: { type: DataTypes.INTEGER, defaultValue: 1 }
  }, {
    sequelize,
    modelName: 'ComputerZone',
    tableName: 'computer_zone',
    timestamps: false
  });

  ComputerZone.associate = (models) => {
    ComputerZone.belongsToMany(models.PricingPlan, { through: models.ZonePricingPlan, foreignKey: 'zone_id' });
    ComputerZone.hasMany(models.Computer, { foreignKey: 'zone_id' });
  };

  return ComputerZone;
};