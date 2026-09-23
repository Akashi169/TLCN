const { Model, DataTypes } = require('sequelize');

class ComputerGame extends Model {}

module.exports = (sequelize) => {
  ComputerGame.init({
    computer_id: { type: DataTypes.INTEGER, primaryKey: true },
    game_id: { type: DataTypes.INTEGER, primaryKey: true }
  }, {
    sequelize,
    modelName: 'ComputerGame',
    tableName: 'computer_game',
    timestamps: false
  });

  return ComputerGame;
};
