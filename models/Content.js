const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Content = sequelize.define('Content', {
    key: { type: DataTypes.STRING, unique: true, allowNull: false }, // e.g., 'about', 'privacy', 'terms'
    title: DataTypes.STRING,
    content: { type: DataTypes.TEXT, allowNull: false },
    createdBy: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true
});

Content.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = Content;
