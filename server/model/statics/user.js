const mongoose = require('../../lib/mongoose')
const userSchema = require('../schema/user')

userSchema.statics.findByName = function (name) {
  return this.findOne({
    name: name
  }, {  // 不显示以下字段
    '_id': 0,
    '__v': 0,
    'password': 0
  }).exec()
}

userSchema.statics.findByEmail = function (email) {
  return this.findOne({
    email: email
  }, {
    '_id': 0,
    '__v': 0,
    'password': 0
  }).exec()
}

userSchema.statics.findByEmailAndPassword = function (data) {
  return this.findOne({
    email: data.email,
    password: data.password
  }).exec()
}

userSchema.statics.userDataCount = function (data) {
  return this.count({}).exec()
}

module.exports = mongoose.model('User', userSchema)
