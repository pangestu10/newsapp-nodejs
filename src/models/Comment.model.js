const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);

module.exports = Comment;