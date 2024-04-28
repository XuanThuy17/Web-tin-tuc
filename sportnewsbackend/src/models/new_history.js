'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      New_history.belongsTo(models.History, {foreignKey: 'id_history'})
      New_history.belongsTo(models.New, {foreignKey: 'id_new'})

    }
  }
  New_history.init({
    id_history: DataTypes.INTEGER,
    id_new: DataTypes.INTEGER,
    date_history: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'New_history',
  });
  return New_history;
};