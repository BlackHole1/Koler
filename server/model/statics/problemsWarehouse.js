const mongoose = require('../../lib/mongoose')
const problemsWarehouseSchema = require('../schema/problemsWarehouse')

problemsWarehouseSchema.statics.findByUserAndName = function (user, cb) {
  this.find({
    user: user
  }, {  // 不显示以下字段
    '_id': 0,
    '__v': 0
  }, cb)
}

module.exports = mongoose.model('ProblemsWarehouse', problemsWarehouseSchema)
