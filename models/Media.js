const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Media = sequelize.define('Media', {
    title: DataTypes.STRING,
    url: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('image', 'video', 'document'), defaultValue: 'image' },
    createdBy: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true
});

Media.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = Media;
