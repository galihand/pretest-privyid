const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    try {
      const user = await User.create(req.body)
      const data = {
        username: user.username,
        email: user.email
      }

      const token = await jwt.sign(data, process.env.SECRET_KEY)
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
  },

  auth: async (req, res) => {
    try {
      let user
      if (req.body.email) {
        user = await User.findOne({ where: { email: req.body.email } })
        if (!user) throw new Error('Email does not exist')
      } else {
        user = await User.findOne({ where: { username: req.body.username } })
        if (!user) throw new Error('Username does not exist')
      }

      const checkPassword = await bcrypt.compareSync(req.body.password, user.password)
      if (!checkPassword) throw new Error('Password incorrect')

      const data = {
        username: user.username,
        email: user.email
      }
      const token = await jwt.sign(data, process.env.SECRET_KEY)
      data.token = token

      res.status(202).json({
        status:'success',
        data
      })
    } catch (err) {
      res.status(401).json({
        status:'fail',
        message: err.message
      })
    }
  }
}