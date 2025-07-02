const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User');

const Menu = sequelize.define('Menu', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  createdBy: { type: DataTypes.INTEGER, allowNull: false }

});


Menu.belongsTo(User, { foreignKey: 'createdBy' });
User.hasMany(Menu, { foreignKey: 'createdBy' });


module.exports = Menu;
