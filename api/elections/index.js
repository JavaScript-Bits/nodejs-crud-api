const express = require('express')
const joi = require('joi')
const router = express.Router()
const validate = require('./middleware')
const {
  createElection,
  fetchElections,
  getElection,
  updateElection,
  deleteElection
} = require('./actions')

const createSchema = joi.object().keys({
  candidate: joi.string().required(),
  votes: joi.number().default(0),
  party: joi.string().required()
})

const updateSchema = joi.object().keys({
  candidate: joi.string(),
  votes: joi.number(),
  party: joi.string()
})

router
  .post('/', validate({ schema: createSchema }), createElection)
  .get('/', fetchElections)
  .get('/:electionId', getElection)
  .put('/:electionId', validate({ schema: createSchema }), updateElection)
  .patch('/:electionId', validate({ schema: updateSchema }), updateElection)
  .delete('/:electionId', deleteElection)

module.exports = router
