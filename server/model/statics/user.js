const mongoose = require('../../lib/mongoose')
const userSchema = require('../schema/user')

userSchema.statics.findByName = function (name, cb) {
  this.find({
    name: name
  }, cb)
}

userSchema.statics.findByEmailAndPassword = function (data, cb) {
  this.findOne({
    email: data.email,
    password: data.password
  }, cb)
}

module.exports = mongoose.model('User', userSchema)
