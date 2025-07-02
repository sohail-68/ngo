const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Menu = require('./Menu');

const Submenu = sequelize.define('Submenu', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
    slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Menu.hasMany(Submenu, { foreignKey: 'menuId' });
Submenu.belongsTo(Menu, { foreignKey: 'menuId' });

module.exports = Submenu;
