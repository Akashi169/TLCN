module.exports = (sequelize, DataTypes) => {
    const GameCategory = sequelize.define('GameCategory', {
        category_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false }
    }, { tableName: 'game_category', timestamps: false });

    GameCategory.associate = (models) => {
        GameCategory.hasMany(models.Game, { foreignKey: 'category_id' });
    };
    return GameCategory;
};