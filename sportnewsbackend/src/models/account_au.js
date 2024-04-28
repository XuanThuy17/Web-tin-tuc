'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account_au extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account_au.belongsTo(models.Role, {foreignKey: 'roleID'})
      Account_au.hasMany(models.New, {foreignKey: 'id_author'})

    }
  }
  Account_au.init({
    // id_admin: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'), 
      defaultValue: 'pending'
    },
    roleID: DataTypes.INTEGER,
    birthday: DataTypes.STRING,
    location: DataTypes.STRING,
    img_avt: DataTypes.BLOB('long'),
    gender: DataTypes.ENUM('Male','Female','Other')
  }, {
    sequelize,
    modelName: 'Account_au',
  });
  return Account_au;
};