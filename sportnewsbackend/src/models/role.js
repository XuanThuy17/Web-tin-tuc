'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.Account_us, {foreignKey: 'roleID'})
      Role.hasMany(models.Account_au, {foreignKey: 'roleID'})
      Role.hasMany(models.Account_ad, {foreignKey: 'roleID'})
      
    }
  }
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};