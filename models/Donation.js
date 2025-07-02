const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Donation = sequelize.define('Donation', {
    donorName: { type: DataTypes.STRING, allowNull: false },
    donorEmail: { type: DataTypes.STRING },
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    message: DataTypes.TEXT,
    status: { type: DataTypes.ENUM('pending', 'completed', 'failed'), defaultValue: 'pending' },
    createdBy: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true
});

Donation.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = Donation;
