'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.hasMany(models.New_history, {foreignKey: 'id_history'})
      History.belongsTo(models.Account_us, {foreignKey: 'id_account'})
      
    }
  }
  History.init({
    id_account: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};