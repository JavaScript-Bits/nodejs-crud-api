const express = require('express')
const httpStatus = require('http-status')
const bodyParser = require('body-parser')

const {
  createElection,
  fetchElections,
  getElection,
  updateElection,
  deleteElection
} = require('./controllers')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  return res.json({ message: 'Opaque nature of elections' })
})

// TODO: VERSION ENDPOINTS
app.post('/elections', createElection)
app.get('/elections', fetchElections)
app.get('/elections/:electionId', getElection)
app.put('/elections/:electionId', updateElection)
app.patch('/elections/:electionId', updateElection)
app.delete('/elections/:electionId', deleteElection)

app.use((err, req, res, next) => {
  return res.status(httpStatus.BAD_REQUEST).send(err)
})

module.exports = app
