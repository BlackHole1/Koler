const mongoose = require('../../lib/mongoose')
const problemsWarehouseSchema = require('../schema/problemsWarehouse')

problemsWarehouseSchema.statics.findByEmail = function (email, cb) {
  return this.find({
    email: email
  }, {  // 不显示以下字段
    '_id': 0,
    '__v': 0
  }, cb).exec()
}

problemsWarehouseSchema.statics.findByEmailAndName = function (email, name, cb) {
  this.find({
    email: email,
    name: name
  }, {  // 不显示以下字段
    '__v': 0
  }, cb)
}

module.exports = mongoose.model('ProblemsWarehouse', problemsWarehouseSchema)
