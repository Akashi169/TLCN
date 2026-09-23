const { Model, DataTypes } = require('sequelize');

class Game extends Model {}

module.exports = (sequelize) => {
  Game.init({
    game_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    cover_image_url: { type: DataTypes.STRING(255) },
    executable_path: { type: DataTypes.STRING(255) },
    is_remote_supported: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
    category_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Game',
    tableName: 'game',
    timestamps: false
  });

  Game.associate = (models) => {
    Game.belongsTo(models.GameCategory, { foreignKey: 'category_id' });
    Game.belongsToMany(models.Computer, { through: models.ComputerGame, foreignKey: 'game_id' });
  };

  return Game;
};