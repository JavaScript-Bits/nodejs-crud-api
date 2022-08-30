const { create, get, fetch, update, remove } = require('./models')

const createElection = async (req, res, next) => {
  try {
    const election = await create(req.body)
    return res.json({ data: election })
  } catch (error) {
    next(error)
  }
}

const fetchElections = async (req, res, next) => {
  try {
    const elections = await fetch()
    return res.json({ data: elections })
  } catch (error) {
    next(error)
  }
}

const getElection = async (req, res, next) => {
  try {
    const election = await get({ query: { _id: req.params.electionId } })
    return res.json({ data: election })
  } catch (error) {
    next(error)
  }
}

const updateElection = async (req, res, next) => {
  try {
    const election = await update({
      query: { _id: req.params.electionId },
      update: req.body
    })
    return res.json({ data: election })
  } catch (error) {
    next(error)
  }
}

const deleteElection = async (req, res, next) => {
  try {
    const removed = await remove({
      query: {
        _id: req.params.electionId
      }
    })
    return res.status(200).json({})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createElection,
  fetchElections,
  getElection,
  updateElection,
  deleteElection
}
