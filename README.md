NODEJS CRUD API

A node js crud API to determine the opaque nature of elections

MODEL

VIEW

CONTROLLER


//

API LAYER - rest api, graphql, grpc, trpc, soap/ Validation
CONTROLLER - calls service layer functions

POST /elections { candidate: '', votes: 0, party: '' }

/** elections/actions.js **/
const createUserAction = async (req, res, next) => {
  try {
    const user = await createUserService(req.body)
    return res.send({ data: user })
  } catch (error) {
    return next(error)
  }
}
/** end of file **/

const validateMiddleware = ({ schema }) => (req, res, next) {
}

/** utils/middleware/validate.js **/
function validateMiddleware ({ schema }) {
  return function actualMiddlware (req, res, next) {
    // { email: 'brian@example.com', password: 'weakpass' }
    // req.query, req.params, req.headers
    const { err, obj } = schema.validate(req.body, {})
    if (err) {
      return next(err)
    }
    return next()
  }
}

module.exports = validateMiddleware
/** end of file **/

/** elections/index.js **/
const validateMiddleware = require('../../utils/middleware/validate')

const schema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required()
})

api
.POST(
  '/elections',
  validateMiddleware({ schema }),
  createUserAction/createUserController
)
.use((err, req, res, next) => {
  // handles errors passed over in next callback
})

/** end of file **/


SERVICE
** BUSINESS LOGIC **
// CREATE A NEW USER - user - { email: brian@example.com, password: weakpass }
// SERVICE LEVEL VALIDATION OF user
// Ensure user does not exist
// Encrypt the password
// Pass data to model layer - { email: brian@example.com, password: 'asdgakooiq0e20198531jlkjaksdpga' }
// return user back to api layer

MODEL
- model.save(user)
