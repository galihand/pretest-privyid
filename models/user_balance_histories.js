'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_balance_histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_balance_histories.belongsTo(models.User_balances, {
        foreignKey: 'user_balance_id'
      })
    }
  };
  User_balance_histories.init({
    user_balance_id: DataTypes.INTEGER,
    balance_before: DataTypes.INTEGER,
    balance_after: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    type: DataTypes.ENUM('debit','credit')
  }, {
    sequelize,
    modelName: 'User_balance_histories',
  });
  return User_balance_histories;
};