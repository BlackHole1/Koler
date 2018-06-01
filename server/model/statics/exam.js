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

examSchema.statics.checkCreateTime = function (createEmail, timestamp, timeRange, members) {
  return this.find({
    email: createEmail
  }).exec()
    .then(function (data) {
      if (data.length === 0) {
        return {
          state: true
        }
      }

      let dataArr = []
      for (let i = 0; i < data.length; i++) {
        let exmaStartTime = data[i].time * 1
        let examEndTime = exmaStartTime + data[i].time_range * 60000
        let currentStartTime = timestamp * 1
        let currentEndTime = currentStartTime + timeRange * 60000
        if (currentStartTime === exmaStartTime || currentStartTime > exmaStartTime && currentStartTime < examEndTime) {
          dataArr.push(data[i])
        }
        if (currentEndTime === examEndTime || currentEndTime > exmaStartTime && currentEndTime < examEndTime) {
          dataArr.push(data[i])
        }
      }

      return dataArr.length === 0 ? [] : dataArr
    })
    .then(data => {
      if (data.length === 0) {
        return {
          state: true
        }
      }

      for (let i = 0; i < data.length; i++) {
        let users = data[i].users
        for (let x = 0; x < users.length; x++) {
          let user = users[x]
          for (let y = 0; y < members.length; y++) {
            if (user === members[y]) {
              return {
                state: false,
                data: data[i].name
              }
            }
          }
        }
      }
      return {
        state: true
      }
    })
}

module.exports = mongoose.model('Exam', examSchema)
