'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account_ad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account_ad.belongsTo(models.Role, {foreignKey: 'roleID'})

    }
  }
  Account_ad.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    img_avt: DataTypes.BLOB('long'),
    roleID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account_ad',
  });
  return Account_ad;
};