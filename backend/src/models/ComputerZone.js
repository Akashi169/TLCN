const { Model, DataTypes } = require('sequelize');
const { ComputerStatus } = require('../constants/enums');

class ComputerZone extends Model {
  async getAvailableComputers() {
    const Computer = this.sequelize.models.Computer;
    return await Computer.findAll({
      where: {
        zone_id: this.zone_id,
        status: ComputerStatus.OFFLINE
      }
    });
  }
}

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