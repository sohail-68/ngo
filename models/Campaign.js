const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Campaign = sequelize.define('Campaign', {
    title: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    goalAmount: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false
    },
    raisedAmount: { 
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    status: { 
        type: DataTypes.ENUM('active', 'completed', 'inactive', 'pending', 'rejected'),
        defaultValue: 'pending'
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'general'
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    createdBy: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: true
});

Campaign.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = Campaign;
