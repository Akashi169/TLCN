module.exports = (sequelize, DataTypes) => {
    const PricingPlan = sequelize.define('PricingPlan', {
        pricing_plan_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    }, { tableName: 'pricing_plan', timestamps: false });

    PricingPlan.associate = (models) => {
        PricingPlan.hasMany(models.ComputerZone, { foreignKey: 'pricing_plan_id' });
    };
    return PricingPlan;
};