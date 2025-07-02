const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Blog = sequelize.define('Blog', {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    excerpt: DataTypes.TEXT,
    image: DataTypes.STRING,
    status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
    metaTitle: DataTypes.STRING,
    metaDescription: DataTypes.TEXT,
    metaKeywords: DataTypes.TEXT,
    publishedAt: { type: DataTypes.DATE, allowNull: true },
    createdBy: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true  // 👉 Automatically adds createdAt & updatedAt
});

Blog.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = Blog;
