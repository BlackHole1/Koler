const mongoose = require('../../lib/mongoose')
const userSchema = require('../schema/user')

userSchema.statics.findByName = function (name, cb) {
  this.findOne({
    name: name
  }, {  // 不显示以下字段
    '_id': 0,
    '__v': 0,
    'password': 0
  }, cb)
}

userSchema.statics.findByEmailAndPassword = function (data, cb) {
  this.findOne({
    email: data.email,
    password: data.password
  }, cb)
}

module.exports = mongoose.model('User', userSchema)
