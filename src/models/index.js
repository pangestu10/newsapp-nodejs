const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import semua model
const User = require('./User.model');
const Article = require('./Article.model');
const Category = require('./Category.model');
const Tag = require('./Tag.model');
const Comment = require('./Comment.model'); // Akan kita buat
const Bookmark = require('./Bookmark.model'); // Akan kita buat

// Definisikan asosiasi
// Asosiasi yang sudah ada
User.hasMany(Article, { foreignKey: 'authorId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Asosiasi Baru: Many-to-Many Article & Category
const ArticleCategory = sequelize.define('ArticleCategory', {}, { timestamps: false });
Article.belongsToMany(Category, { through: ArticleCategory, as: 'categories' });
Category.belongsToMany(Article, { through: ArticleCategory, as: 'articles' });

// Asosiasi Baru: Many-to-Many Article & Tag
const ArticleTag = sequelize.define('ArticleTag', {}, { timestamps: false });
Article.belongsToMany(Tag, { through: ArticleTag, as: 'tags' });
Tag.belongsToMany(Article, { through: ArticleTag, as: 'articles' });

// Asosiasi untuk Komentar
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Article.hasMany(Comment, { foreignKey: 'articleId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Comment.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });

// Asosiasi untuk Bookmark
User.belongsToMany(Article, { through: Bookmark, as: 'bookmarkedArticles', foreignKey: 'userId' });
Article.belongsToMany(User, { through: Bookmark, as: 'bookmarkedBy', foreignKey: 'articleId' });

const db = {
  sequelize,
  Sequelize,
  User,
  Article,
  Category,
  Tag,
  Comment,
  Bookmark,
};

module.exports = db;