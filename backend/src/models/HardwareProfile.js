const { Model, DataTypes } = require('sequelize');

class HardwareProfile extends Model {}

module.exports = (sequelize) => {
  HardwareProfile.init({
    profile_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    profile_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    cpu_model: { type: DataTypes.STRING(150) },
    gpu_model: { type: DataTypes.STRING(150) },
    ram_capacity: { type: DataTypes.STRING(150) },
    storage_type: { type: DataTypes.STRING(150) },
    monitor: { type: DataTypes.STRING(150) },
    gear: { type: DataTypes.STRING(255) },
    zone_id: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'HardwareProfile',
    tableName: 'hardware_profile',
    timestamps: false
  });

  HardwareProfile.associate = (models) => {
    HardwareProfile.belongsTo(models.ComputerZone, { foreignKey: 'zone_id' });
    HardwareProfile.hasMany(models.Computer, { foreignKey: 'hardware_profile_id' });
  };

  return HardwareProfile;
};
