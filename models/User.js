const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
role: {
  type: DataTypes.ENUM('admin', 'editor', 'viewer'),
  defaultValue: 'editor'
  
},
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
