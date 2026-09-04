module.exports = (sequelize, DataTypes) => {
    const MembershipRank = sequelize.define('MembershipRank', {
        rank_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(50), allowNull: false }
    }, { tableName: 'membership_rank', timestamps: false });

    MembershipRank.associate = (models) => {
        MembershipRank.hasMany(models.Member, { foreignKey: 'rank_id' });
    };
    return MembershipRank;
};