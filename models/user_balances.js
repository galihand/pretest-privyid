'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class User_balances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_balances.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  };
  User_balances.init({
    user_id: DataTypes.INTEGER,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_balances',
  });

  User_balances.topup = async (data) => {
    const { user_id, ammount } = data
    if(!Number.isInteger(ammount)) return Promise.reject(new Error('Ammount must be number'))
    const pastBalance = await User_balances.findOne({ where: { user_id } })
    const coba = await User_balances.increment('balance', {
      by: ammount,
      where: { user_id }
    })
    const balance = await User_balances.findOne({ where: { user_id } })
    return balance
  }

  User_balances.transfer = async (data) => {

  }

  return User_balances;
};