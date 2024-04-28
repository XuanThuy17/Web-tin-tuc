'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Account_us, {foreignKey: 'id_account'})
      Comment.belongsTo(models.New, {foreignKey: 'id_new'})

    }
  }
  Comment.init({
    id_account: DataTypes.INTEGER,
    id_new: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};