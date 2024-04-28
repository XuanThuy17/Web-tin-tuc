'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New_save extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      New_save.belongsTo(models.Save, {foreignKey: 'id_save'})
      New_save.belongsTo(models.New, {foreignKey: 'id_new'})

    }
  }
  New_save.init({
    id_save: DataTypes.INTEGER,
    id_new: DataTypes.INTEGER,
    date_save: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'New_save',
  });
  return New_save;
};