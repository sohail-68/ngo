const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Slider = sequelize.define('Slider', {
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
  createdBy: { type: DataTypes.INTEGER, allowNull: false }


}, {
    timestamps: false
});
Slider.belongsTo(User, { foreignKey: 'createdBy' });
User.hasMany(Slider, { foreignKey: 'createdBy' });


module.exports = Slider;
