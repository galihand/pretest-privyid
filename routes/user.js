require('../middleware/passport-jwt')
const router = require('express').Router()
const user = require('../controllers/user')
const passport = require('passport')

router.post('/', user.register)
router.post('/auth', user.auth)
router.get('/', passport.authenticate('jwt', { session: false }), user.show)

module.exports = router