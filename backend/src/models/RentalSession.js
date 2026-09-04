module.exports = (sequelize, DataTypes) => {
    const RentalSession = sequelize.define('RentalSession', {
        session_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        start_time: { type: DataTypes.DATE, allowNull: false },
        end_time: { type: DataTypes.DATE },
        status: { type: DataTypes.STRING(50), allowNull: false },
        computer_id: { type: DataTypes.INTEGER, allowNull: false },
        member_id: { type: DataTypes.INTEGER, allowNull: false }
    }, { tableName: 'rental_session', timestamps: false });

    RentalSession.associate = (models) => {
        RentalSession.belongsTo(models.Computer, { foreignKey: 'computer_id' });
        RentalSession.belongsTo(models.Member, { foreignKey: 'member_id' });
        RentalSession.hasMany(models.ServiceOrder, { foreignKey: 'session_id' });
    };
    return RentalSession;
};