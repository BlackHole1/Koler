const mongoose = require('../../lib/mongoose')
const problemsWarehouseSchema = require('../schema/problemsWarehouse')

problemsWarehouseSchema.statics.findByEmailAndName = function (email, cb) {
  this.find({
    email: email
  }, {  // 不显示以下字段
    '_id': 0,
    '__v': 0
  }, cb)
}

problemsWarehouseSchema.statics.findByName = function (name, cb) {
  this.find({
    name: name
  }, {  // 不显示以下字段
    '_id': 0,
    '__v': 0
  }, cb)
}

module.exports = mongoose.model('ProblemsWarehouse', problemsWarehouseSchema)
