const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb://root:password123@localhost:27017,localhost:27018,localhost:27019/elections?replicaSet=replicat&authSource=admin', (err) => {
  if (err) throw err
  app.listen(3000, (err) => {
    if (err) throw err
    console.log('listening on port 3000')
  })
})
