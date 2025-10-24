const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Bookmark extends Model {}

Bookmark.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Articles',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Bookmark',
    timestamps: true, // Untuk tahu kapan user bookmark artikel
  }
);

module.exports = Bookmark;