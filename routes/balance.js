const router = require('express').Router()
const balance = require('../controllers/balance')

router.post('/', balance.topup)
router.post('/transfer', balance.transfer)
router.get('/', balance.showBalance)
router.get('/history', balance.showHistory)

module.exports = router