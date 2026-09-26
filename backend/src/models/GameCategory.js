const { Model, DataTypes } = require('sequelize');

class GameCategory extends Model {
  async getGames() {
    const Game = this.sequelize.models.Game;
    return await Game.findAll({ where: { category_id: this.category_id } });
  }

  rename(newName) {
    this.name = newName;
    return this.save();
  }
}

module.exports = (sequelize) => {
  GameCategory.init({
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    sequelize,
    modelName: 'GameCategory',
    tableName: 'game_category',
    timestamps: false
  });

  GameCategory.associate = (models) => {
    GameCategory.hasMany(models.Game, { foreignKey: 'category_id' });
  };

  return GameCategory;
};