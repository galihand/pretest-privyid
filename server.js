require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/index')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1', router)

module.exports = app