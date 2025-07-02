const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Team = sequelize.define('Team', {
    name: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    description: DataTypes.TEXT,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    createdBy: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true
});

Team.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = Team;
