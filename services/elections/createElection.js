'use strict'

const { create } = require('../../models/elections')

const createElection = election => {
  return create(election)
}
