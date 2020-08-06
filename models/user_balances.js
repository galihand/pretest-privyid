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

      User_balances.hasMany(models.User_balance_histories, {
        foreignKey: 'user_balance_id'
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
    if (!Number.isInteger(ammount)) return Promise.reject(new Error('Ammount must be number'))
    const pastBalance = await User_balances.findOne({ where: { user_id } })
    const coba = await User_balances.increment('balance', {
      by: ammount,
      where: { user_id }
    })
    const balance = await User_balances.findOne({ where: { user_id } })

    await User_balances.historyTopup({
      user_balance_id: balance.id,
      balance_before: pastBalance.balance,
      balance_after: balance.balance
    })

    return balance
  }

  User_balances.transfer = async (data) => {
    const { username, ammount, currentUserId } = data
    const userTarget = await sequelize.models.User.findOne({ where: { username } })

    if (!userTarget) return Promise.reject(new Error('User is not exist'))
    if (!Number.isInteger(ammount)) return Promise.reject(new Error('Ammount must be number'))

    const balanceTarget = await User_balances.findOne({ where: { user_id: userTarget.id } })
    const currentUser = await User_balances.findOne({ where: { user_id: currentUserId } })
    if(ammount > currentUser.balance) return Promise.reject(new Error('Your balance is not enough'))

    await User_balances.increment('balance', {
      by: ammount,
      where: { user_id: userTarget.id }
    })

    await User_balances.decrement('balance', {
      by: ammount,
      where: { user_id: currentUserId }
    })

    data = {
      targetUserId: userTarget.id,
      pastTargetBalance: balanceTarget.balance,
      currentUserId,
      pastUserBalance: currentUser.balance
    }

    const result = await User_balances.historyTransfer(data)

    return result
  }

  User_balances.historyTopup = async (data) => {
    const { user_balance_id, balance_before, balance_after } = data
    const topup = await sequelize.models.User_balance_histories.create({
      user_balance_id,
      balance_before,
      balance_after,
      activity: 'Topup Balance',
      type: 'debit'
    })

    return topup
  }

  User_balances.historyTransfer = async (data) => {
    const { targetUserId, pastTargetBalance, currentUserId, pastUserBalance } = data
    const target = await User_balances.findOne({ where: { user_id: targetUserId }, include: ['User'] })
    const current = await User_balances.findOne({ where: { user_id: currentUserId }, include: ['User'] })
    const history = await sequelize.models.User_balance_histories.bulkCreate([
      {
        user_balance_id: target.id,
        balance_before: pastTargetBalance,
        balance_after: target.balance,
        activity: `Transfer From ${current.User.username}`,
        type: 'debit'
      },
      {
        user_balance_id: current.id,
        balance_before: pastUserBalance,
        balance_after: current.balance,
        activity: `Transfer To ${target.User.username}`,
        type: 'credit'
      }
    ], { returning: true })
    return history[1]
  }

  return User_balances;
};