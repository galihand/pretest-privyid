const { User_balances } = require('../models')

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
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  },

  transfer: async (req,res) => {
  }
}