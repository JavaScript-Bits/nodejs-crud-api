const express = require('express')
const httpStatus = require('http-status')
const bodyParser = require('body-parser')
const electionsRouter = require('./api/elections')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  return res.json({ message: 'Opaque nature of elections' })
})

app.use('/elections', electionsRouter)

app.use((err, req, res, next) => {
  res.status(400).send(err)
})

module.exports = app
