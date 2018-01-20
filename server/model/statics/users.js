const mongoose = require('../../lib/mongoose')
const usersSchema = require('../schema/user')

usersSchema.statics.findUnderByEmail = function (email) {
  return this.find({
    upper_email: email
  }).exec()
}

module.exports = mongoose.model('Users', usersSchema)
