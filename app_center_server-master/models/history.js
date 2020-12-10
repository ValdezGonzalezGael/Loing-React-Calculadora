'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    static associate(models) {
      // define association here
    }
  };
  history.init({
    operation: DataTypes.STRING,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};