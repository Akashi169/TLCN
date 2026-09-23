const { Model, DataTypes } = require('sequelize');
const { ComputerStatus, SessionType } = require('../constants/enums');

class ComputerStatusLog extends Model {}

module.exports = (sequelize) => {
  ComputerStatusLog.init({
    log_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    computer_id: { type: DataTypes.INTEGER, allowNull: false },
    member_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.ENUM(...Object.values(ComputerStatus)), allowNull: false },
    session_type: { type: DataTypes.ENUM(...Object.values(SessionType)) }
  }, {
    sequelize,
    modelName: 'ComputerStatusLog',
    tableName: 'computer_status_log',
    timestamps: true,
    createdAt: 'recorded_at',
    updatedAt: false
  });

  ComputerStatusLog.associate = (models) => {
    ComputerStatusLog.belongsTo(models.Computer, { foreignKey: 'computer_id' });
    ComputerStatusLog.belongsTo(models.Member, { foreignKey: 'member_id' });
  };

  return ComputerStatusLog;
};
