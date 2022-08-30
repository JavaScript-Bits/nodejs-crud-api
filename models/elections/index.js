const { model } = require('./schema')

const electionsModel = {
  create: (data) => {
    return model.create(data)
  },

  fetch: ({ query } = {}) => {
    return model.find(query)
  },

  get: ({ query }) => {
    return model.findOne({ query })
  },

  update: ({ query, update }) => {
    return model.findOneAndUpdate(query, update, { new: true })
  },

  remove: ({ query }) => {
    return model.deleteOne(query)
  }
}

module.exports = electionsModel
