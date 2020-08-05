'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_balance_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_balance_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'User_balances',
            schema: 'public'
          }
        },
        key: 'id'
      },
      balance_before: {
        type: Sequelize.INTEGER
      },
      balance_after: {
        type: Sequelize.INTEGER
      },
      activity: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('debit','credit')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_balance_histories');
  }
};