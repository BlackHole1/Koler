const mongoose = require('mongoose')
const config = require('../../common/config')

mongoose.Promise = global.Promise
mongoose.connect(config.mongodb.url, {useMongoClient: true})

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ' + err)
})

module.exports = mongoose
