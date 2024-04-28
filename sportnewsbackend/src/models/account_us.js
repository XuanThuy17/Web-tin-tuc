'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account_us extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account_us.hasOne(models.History, {foreignKey: 'id_account'})
      Account_us.hasOne(models.Save, {foreignKey: 'id_account'})
      Account_us.hasMany(models.Comment, {foreignKey: 'id_account'})
      Account_us.belongsTo(models.Role, {foreignKey: 'roleID'})
    }
  }
  Account_us.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleID: DataTypes.INTEGER,
    fullname: DataTypes.STRING,
    birthday: DataTypes.STRING,
    location: DataTypes.STRING,
    img_avt: DataTypes.BLOB('long'),
    gender: DataTypes.ENUM('Male','Female','Other')
  }, {
    sequelize,
    modelName: 'Account_us',
  });
  return Account_us;
};