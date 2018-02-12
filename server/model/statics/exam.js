const mongoose = require('../../lib/mongoose')
const examSchema = require('../schema/exam')

examSchema.statics.findByEmail = function (email) {
  return this.find({
    email: email
  }, {  // 不显示以下字段
    '_id': 0,
    '__v': 0
  }).exec()
}

examSchema.statics.findByEmailAndName = function (email, name) {
  return this.find({
    email: email,
    name: name
  }, {  // 不显示以下字段
    '_id': 0,
    '__v': 0
  }).exec()
}

module.exports = mongoose.model('Exam', examSchema)
