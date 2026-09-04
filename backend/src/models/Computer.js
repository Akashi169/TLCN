module.exports = (sequelize, DataTypes) => {
    const Computer = sequelize.define('Computer', {
        computer_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        computer_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        status: { type: DataTypes.STRING(50), allowNull: false },
        zone_id: { type: DataTypes.INTEGER, allowNull: false }
    }, { tableName: 'computer', timestamps: false });

    Computer.associate = (models) => {
        Computer.belongsTo(models.ComputerZone, { foreignKey: 'zone_id' });
        Computer.belongsToMany(models.Game, { through: 'computer_game', foreignKey: 'computer_id' });
        Computer.hasMany(models.RentalSession, { foreignKey: 'computer_id' });
    };
    return Computer;
};