const { Model, DataTypes } = require('sequelize');

class ComboPackage extends Model {
  isTimeValid(currentTime) {
    if (this.start_time_limit && currentTime < this.start_time_limit) return false;
    if (this.end_time_limit && currentTime > this.end_time_limit) return false;
    return true;
  }

  canApplyToZone(zoneTier) {
    return !this.allowed_tier || zoneTier >= this.allowed_tier;
  }

  async getComboItems() {
    const ComboItem = this.sequelize.models.ComboItem;
    return await ComboItem.findAll({ where: { combo_id: this.combo_id } });
  }

  updateInfo(price, duration, isActive) {
    this.price = price;
    this.duration_minutes = duration;
    this.is_active = isActive;
    return this.save();
  }
}

module.exports = (sequelize) => {
  ComboPackage.init({
    combo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
    start_time_limit: { type: DataTypes.TIME },
    end_time_limit: { type: DataTypes.TIME },
    allowed_tier: { type: DataTypes.INTEGER },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'ComboPackage',
    tableName: 'combo_package',
    timestamps: false
  });

  ComboPackage.associate = (models) => {
    ComboPackage.hasMany(models.ComboItem, { foreignKey: 'combo_id', onDelete: 'CASCADE' });
    ComboPackage.belongsToMany(models.ServiceItem, { through: models.ComboItem, foreignKey: 'combo_id' });
  };

  return ComboPackage;
};