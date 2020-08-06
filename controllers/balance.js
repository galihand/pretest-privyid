const { User_balances, User_balance_histories } = require('../models')

module.exports = {
  topup: async (req, res) => {
    try {
      const data = {
        user_id: req.user.id,
        ammount: req.body.ammount
      }
      const result = await User_balances.topup(data)
      res.status(200).json({
        status: 'success',
        data: result
      })
    } catch (err) {
      res.status(422).json({
        status: 'fail',
        message: err.message
      })
    }
  },

  transfer: async (req, res) => {
    try {
      const data = {
        username: req.body.username,
        ammount: req.body.ammount,
        currentUserId: req.user.id
      }
      const result = await User_balances.transfer(data)
      res.status(200).json({
        status: 'success',
        data: result
      })
    } catch (err) {
      res.status(422).json({
        status: 'fail',
        message: err.message
      })
    }
  },

  showBalance: async (req, res) => {
    try {
      const balance = await User_balances.findOne({ where: { user_id: req.user.id } })
      res.status(200).json({
        status: 'success',
        data: balance
      })
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: err.message
      })
    }
  },

  showHistory: async (req, res) => {
    try {
      const history = await User_balance_histories.findAll({
        order: [['createdAt', 'DESC']],
        include: [{
          model: User_balances,
          where: { user_id: req.user.id },
          attributes:[]
        }]
      })
      res.status(200).json({
        status: 'succes',
        data: history
      })
    } catch (err) {
      res.status(500).json({
        status:'fail',
        message: err.message
      })
    }
  }
}