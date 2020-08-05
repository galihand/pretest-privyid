const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    try {
      const user = await User.create(req.body)
      const data = {
        username:user.username,
        email:user.email
      }
      
      const token = jwt.sign(data, process.env.SECRET_KEY)
      data.token = token

      res.status(201).json({
        status: 'success',
        data
      })
    } catch (err) {
      res.status(422).json({
        status: 'fail',
        message: err.message
      })
    }
  }
}