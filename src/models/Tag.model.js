const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Tag',
  }
);

module.exports = Tag;