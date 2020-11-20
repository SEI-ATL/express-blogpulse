'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      models.comment.belongsTo(models.article)
    }
  };
  comment.init({
    name: DataTypes.STRING,
    comment: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};