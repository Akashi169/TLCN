// src/models/RentalSession.js
const { SessionStatus } = require('../constants/enums');

module.exports = (sequelize, DataTypes) => {
    const RentalSession = sequelize.define('RentalSession', {
        session_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        start_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        end_time: { type: DataTypes.DATE },
        status: { 
            type: DataTypes.ENUM(...Object.values(SessionStatus)), 
            allowNull: false,
            defaultValue: SessionStatus.ACTIVE 
        },
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