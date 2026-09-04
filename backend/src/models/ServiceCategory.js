module.exports = (sequelize, DataTypes) => {
    const ServiceCategory = sequelize.define('ServiceCategory', {
        category_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false }
    }, { tableName: 'service_category', timestamps: false });

    ServiceCategory.associate = (models) => {
        ServiceCategory.hasMany(models.ServiceItem, { foreignKey: 'category_id' });
    };
    return ServiceCategory;
};