const { Model, DataTypes } = require('sequelize');
const { ComputerStatus } = require('../constants/enums');

class Computer extends Model {
  async updateStatus(newStatus) {
    this.status = newStatus;
    await this.save();
  }
}

module.exports = (sequelize) => {
  Computer.init({
    computer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    computer_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    ip_address: { type: DataTypes.STRING(50) },
    mac_address: { type: DataTypes.STRING(50) },
    status: { type: DataTypes.ENUM(...Object.values(ComputerStatus)), defaultValue: ComputerStatus.OFFLINE },

    is_remote_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    zone_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Computer',
    tableName: 'computer',
    timestamps: false
  });

  Computer.associate = (models) => {
    Computer.belongsTo(models.ComputerZone, { foreignKey: 'zone_id' });
    Computer.belongsToMany(models.Game, { through: models.ComputerGame, foreignKey: 'computer_id' });
    Computer.hasMany(models.ComputerStatusLog, { foreignKey: 'computer_id' });
  };

  return Computer;
};