const mongoose = require('mongoose')

const schema = mongoose.Schema({
  candidate: {
    type: String,
    required: true,
    unique: true
  },
  votes: {
    type: String,
    required: true,
    unique: true
  },
  party: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const model = mongoose.model('Election', schema)

module.exports = { model, schema }
