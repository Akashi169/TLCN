const { Model, DataTypes } = require('sequelize');

class MembershipRank extends Model {}

module.exports = (sequelize) => {
  MembershipRank.init({
    rank_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    required_point: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    rank_level: { type: DataTypes.INTEGER, allowNull: false },
    discount_percent: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0.00 }
  }, {
    sequelize,
    modelName: 'MembershipRank',
    tableName: 'membership_rank',
    timestamps: false
  });

  MembershipRank.associate = (models) => {
    MembershipRank.hasMany(models.Member, { foreignKey: 'rank_id' });
    MembershipRank.hasMany(models.ServiceItem, { foreignKey: 'min_discount_rank' });
  };

  return MembershipRank;
};