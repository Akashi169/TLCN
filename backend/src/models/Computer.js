// src/models/Computer.js
const { ComputerStatus } = require('../constants/enums');

module.exports = (sequelize, DataTypes) => {
    const Computer = sequelize.define('Computer', {
        computer_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        computer_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        status: { 
            type: DataTypes.ENUM(...Object.values(ComputerStatus)), 
            allowNull: false,
            defaultValue: ComputerStatus.OFFLINE 
        },
        zone_id: { type: DataTypes.INTEGER, allowNull: false },
        cpu: { type: DataTypes.STRING(100), allowNull: true },
        cpu_specs: { type: DataTypes.STRING(100), allowNull: true },
        ram: { type: DataTypes.STRING(50), allowNull: true },
        ram_specs: { type: DataTypes.STRING(100), allowNull: true },
        gpu: { type: DataTypes.STRING(100), allowNull: true },
        gpu_edition: { type: DataTypes.STRING(100), allowNull: true },
        storage_type: { type: DataTypes.STRING(100), allowNull: true },
        storage_specs: { type: DataTypes.STRING(100), allowNull: true },
        boot_image: { type: DataTypes.STRING(150), allowNull: true },
        cpu_temp: { type: DataTypes.INTEGER, allowNull: true },
        gpu_temp: { type: DataTypes.INTEGER, allowNull: true },
        fan_speed: { type: DataTypes.STRING(20), allowNull: true },
        san_ping: { type: DataTypes.STRING(20), allowNull: true }
    }, { tableName: 'computer', timestamps: false });

    Computer.associate = (models) => {
        Computer.belongsTo(models.ComputerZone, { foreignKey: 'zone_id' });
        Computer.belongsToMany(models.Game, { through: 'computer_game', foreignKey: 'computer_id' });
        Computer.hasMany(models.RentalSession, { foreignKey: 'computer_id' });
    };

    return Computer;
};