'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Save extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Save.hasMany(models.New_save, {foreignKey: 'id_save'})
      Save.belongsTo(models.Account_us, {foreignKey: 'id_account'})

    }
  }
  Save.init({
    id_account: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Save',
  });
  return Save;
};