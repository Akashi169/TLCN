const { Model, DataTypes } = require('sequelize');
const { ComboTimeStatus } = require('../constants/enums');

class ComboTime extends Model {
  isActive() {
    return this.status === ComboTimeStatus.ACTIVE;
  }

  markExpired() {
    this.status = ComboTimeStatus.EXPIRED;
    return this.save();
  }

  cancel() {
    this.status = ComboTimeStatus.CANCELLED;
    return this.save();
  }

  calculateRemainingMinutes() {
    if (!this.end_time) return 0;
    const now = new Date();
    const end = new Date(this.end_time);
    const diffMs = end - now;
    return Math.max(0, Math.floor(diffMs / (1000 * 60)));
  }

  isValidForZone(zoneTier) {
    return !this.allowed_tier || zoneTier >= this.allowed_tier;
  }

  extendEndTime(minutes) {
    const currentEnd = this.end_time ? new Date(this.end_time) : new Date();
    currentEnd.setMinutes(currentEnd.getMinutes() + minutes);
    this.end_time = currentEnd;
    return this.save();
  }
}

module.exports = (sequelize) => {
  ComboTime.init({
    combo_time_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    start_time: { type: DataTypes.DATE },
    end_time: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM(...Object.values(ComboTimeStatus)), defaultValue: ComboTimeStatus.ACTIVE },
    allowed_tier: { type: DataTypes.INTEGER },
    order_id: { type: DataTypes.INTEGER, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'ComboTime',
    tableName: 'combo_time',
    timestamps: false
  });

  ComboTime.associate = (models) => {
    ComboTime.belongsTo(models.ServiceOrder, { foreignKey: 'order_id' });
  };

  return ComboTime;
};
