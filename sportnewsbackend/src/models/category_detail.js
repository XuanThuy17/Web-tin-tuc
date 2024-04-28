'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category_detail.belongsTo(models.Category, {foreignKey: 'id_category'})
      Category_detail.hasMany(models.New,{foreignKey: 'id_category_detail'})
      
    }
  }
  Category_detail.init({
    name: DataTypes.STRING,
    id_category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category_detail',
  });
  return Category_detail;
};