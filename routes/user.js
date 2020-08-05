const router = require('express').Router()
const user = require('../controllers/user')

router.post('/', user.register)
router.post('/auth', user.auth)
router.get('/', (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'API Show user'
  })
})
router.put('/', (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'API Update user'
  })
})

module.exports = router