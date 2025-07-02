const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Menu = require('./Menu');

const Page = sequelize.define('Page', {
  title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT, // Long text like HTML or JSON string
      allowNull: true
    },
    seo: {
      type: DataTypes.JSON,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      defaultValue: 'draft'
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contentImage: {
      type: DataTypes.JSON, // JSON field to store image object { url: '...' }
      allowNull: true
    },
    bannerImage: {
      type: DataTypes.JSON, // JSON field for banner image { url: '...' }
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'pages',
    timestamps: true
  });


Page.belongsTo(User, { foreignKey: 'createdBy' });
Page.belongsTo(Menu, { foreignKey: 'menuId' });

module.exports = Page;