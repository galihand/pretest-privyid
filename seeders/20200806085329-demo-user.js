'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Users', [
        {
          id: 1,
          email: 'tester@mail.com',
          username: 'tester',
          password: bcrypt.hashSync('tester', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          id: 2,
          email: 'anothertester@mail.com',
          username: 'anothertester',
          password: bcrypt.hashSync('anothertester', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]),

      queryInterface.bulkInsert('User_balances', [
        {
          user_id: 1,
          balance: 100000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          balance: 100000,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Users', null, {}),
      queryInterface.bulkDelete('User_balances', null, {})
    ])
  }
};
