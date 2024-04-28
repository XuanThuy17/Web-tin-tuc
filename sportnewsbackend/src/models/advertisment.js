'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Advertisment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Advertisment.init({
    img_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
    quantity: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Advertisment',
  });
  return Advertisment;
};