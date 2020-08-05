const router = require('express').Router()
const balance = require('../controllers/balance')

router.post('/', balance.topup)

module.exports = router