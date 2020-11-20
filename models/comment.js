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
    content: DataTypes.TEXT,
    articleNum: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'comment',
});
return comment
};
