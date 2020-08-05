
const { User } = require('../models')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization')
opts.secretOrKey = process.env.SECRET_KEY
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({
    attributes: ['id', 'email', 'username'],
    where: {
      username: jwt_payload.username,
      email: jwt_payload.email
    }
  })
    .then((user) => {
      return done(null, user)
    })
    .catch(err => {
      return done(err)
    })
}))
