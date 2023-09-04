const { model } = require('./schema')

const electionsModel = {
  create: (data) => {
    return model.create(data).catch((err) => {
      if (err.code === 11000) {
        const error = new Error('unique error on key candidate')
        error.name = 'DUPLICATE_KEY_ERROR'
        error.param = Object.keys(err.keyPattern)[0]
        error.value = err.keyValue[error.param]
        throw error
      }
      throw err;
    });
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
