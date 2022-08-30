const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb://localhost:27017/elections', (err) => {
  if (err) throw err
  app.listen(3000, (err) => {
    if (err) throw err
    console.log('listening on port 3000')
  })
})
