module.exports = (sequelize, DataTypes) => {
    const ComputerZone = sequelize.define('ComputerZone', {
        zone_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        zone_name: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.TEXT },
        pricing_plan_id: { type: DataTypes.INTEGER, allowNull: false }
    }, { tableName: 'computer_zone', timestamps: false });

    ComputerZone.associate = (models) => {
        ComputerZone.belongsTo(models.PricingPlan, { foreignKey: 'pricing_plan_id' });
        ComputerZone.hasMany(models.Computer, { foreignKey: 'zone_id' });
    };
    return ComputerZone;
};