const { Model, DataTypes } = require('sequelize');

class ZonePricingPlan extends Model {}

module.exports = (sequelize) => {
  ZonePricingPlan.init({
    zone_id: { type: DataTypes.INTEGER, primaryKey: true },
    pricing_plan_id: { type: DataTypes.INTEGER, primaryKey: true }
  }, {
    sequelize,
    modelName: 'ZonePricingPlan',
    tableName: 'zone_pricing_plan',
    timestamps: false
  });

  return ZonePricingPlan;
};
