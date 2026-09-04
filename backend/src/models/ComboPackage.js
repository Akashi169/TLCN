module.exports = (sequelize, DataTypes) => {
    const ComboPackage = sequelize.define('ComboPackage', {
        combo_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        duration_time: { type: DataTypes.INTEGER, allowNull: false },
        start_time_limit: { type: DataTypes.TIME },
        end_time_limit: { type: DataTypes.TIME }
    }, { tableName: 'combo_package', timestamps: false });

    ComboPackage.associate = (models) => {
        ComboPackage.hasMany(models.ComboServiceItem, { foreignKey: 'combo_id' });
    };
    return ComboPackage;
};