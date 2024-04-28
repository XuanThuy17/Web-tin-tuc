'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      New.belongsTo(models.Category_detail, {foreignKey: 'id_category_detail'})
      New.belongsTo(models.Account_au, {foreignKey: 'id_author'})
      New.hasMany(models.Comment, {foreignKey: 'id_new'})
      New.hasMany(models.New_history, {foreignKey: 'id_new'})
      New.hasMany(models.New_save, {foreignKey: 'id_new'})
    }
  }
  New.init({
    id_category_detail: DataTypes.INTEGER,
    id_author: DataTypes.INTEGER,
    title: DataTypes.STRING,
    img_title: DataTypes.BLOB('long'),
    content_title: DataTypes.TEXT,
    content: DataTypes.TEXT('long'),
    content_html: DataTypes.TEXT('long'),
    date: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'), 
      defaultValue: 'pending'
    },
  }, {
    sequelize,
    modelName: 'New',
  });
  return New;
};