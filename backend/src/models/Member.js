const { Model, DataTypes } = require('sequelize');

class Member extends Model {
  topUp(amount, isBonus = false) {
    if (isBonus) this.bonus_balance = parseFloat(this.bonus_balance || 0) + amount;
    else this.real_balance = parseFloat(this.real_balance || 0) + amount;
    return this.save();
  }

  deductRealBalance(amount) {
    this.real_balance = parseFloat(this.real_balance || 0) - amount;
    return this.save();
  }

  updateProfile(phone, id_number) {
    this.phone = phone;
    this.id_number = id_number;
    return this.save();
  }
}

module.exports = (sequelize) => {
  Member.init({
    member_id: { type: DataTypes.INTEGER, primaryKey: true },
    id_number: { type: DataTypes.STRING(50) },
    phone: { type: DataTypes.STRING(20) },
    real_balance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
    bonus_balance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
    point: { type: DataTypes.INTEGER, defaultValue: 0 },
    rank_id: { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'Member',
    tableName: 'members',
    timestamps: false
  });

  Member.associate = (models) => {
    Member.belongsTo(models.User, { foreignKey: 'member_id', as: 'userInfo' });
    Member.belongsTo(models.MembershipRank, { foreignKey: 'rank_id' });
    Member.hasMany(models.ComputerStatusLog, { foreignKey: 'member_id' });
    Member.hasMany(models.ServiceOrder, { foreignKey: 'used_by' });
    Member.hasMany(models.FinancialTransaction, { foreignKey: 'used_by' });
  };

  return Member;
};
