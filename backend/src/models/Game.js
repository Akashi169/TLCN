module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        game_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        category_id: { type: DataTypes.INTEGER, allowNull: false }
    }, { tableName: 'game', timestamps: false });

    Game.associate = (models) => {
        Game.belongsTo(models.GameCategory, { foreignKey: 'category_id' });
        Game.belongsToMany(models.Computer, { through: 'computer_game', foreignKey: 'game_id' });
    };
    return Game;
};