const joi = require('joi')

function validate ({ schema }) {
  return function (req, res, next) {
    const { error, value } = schema.validate(req.body, { stripUnknown: true })
    req.body = value
    if (error) {
      return next(error)
    } else {
      return next()
    }
  }
}

module.exports = validate
