const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HomeContent = sequelize.define('HomeContent', {
  
  section1: {
    type: DataTypes.JSON, // { heading, text, image }
    allowNull: true
  },
  section2: {
    type: DataTypes.JSON, // { title, description, image }
    allowNull: true
  },
  footerMenus: {
    type: DataTypes.JSON, // [ { label, icon, url }, ... ]
    allowNull: true
  }

}, {
  timestamps: true
});

module.exports = HomeContent;
