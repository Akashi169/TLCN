const { Model, DataTypes } = require('sequelize');

class ServiceCategory extends Model {}

module.exports = (sequelize) => {
  ServiceCategory.init({
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    sequelize,
    modelName: 'ServiceCategory',
    tableName: 'service_category',
    timestamps: false
  });

  ServiceCategory.associate = (models) => {
    ServiceCategory.hasMany(models.ServiceItem, { foreignKey: 'category_id' });
  };

  return ServiceCategory;
};