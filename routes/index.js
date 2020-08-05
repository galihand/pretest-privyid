const router = require('express').Router()
const user = require('./user')
const balance = require('./balance')
require('../middleware/passport-jwt')
const passport = require('passport')

router.use('/user', user)
router.use('/balance', passport.authenticate('jwt', { session: false }), balance)

module.exports = router