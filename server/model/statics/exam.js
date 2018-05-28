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

examSchema.statics.findByEmailAndId = function (email, id) {
  return this.findOne({
    email: email,
    _id: id
  }, {
    '_id': 0,
    '__v': 0
  }).exec()
}

examSchema.statics.findByTestId = function (id) {
  return this.findOne({
    test_id: id
  }, {
    '_id': 0,
    '__v': 0
  }).exec()
}

examSchema.statics.findById = function (id) {
  return this.findOne({
    id: id
  }, {
    '_id': 0,
    '__v': 0
  }).exec()
}

examSchema.statics.findByTaskId = function (id) {
  return this.findOne({
    timing_task_id: id
  }, {
    '_id': 0,
    '__v': 0
  }).exec()
}

module.exports = mongoose.model('Exam', examSchema)
