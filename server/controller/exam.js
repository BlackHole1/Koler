const ExamModel = require('../model/statics/exam')

const resource = {
  create: (req, res, next) => {
    let {name, time, users, testId, timeRange} = req.body
    let ExamEntity = new ExamModel({
      name: name,
      email: req.$currentUserInfo.email,
      time: time,
      users: users,
      test_id: testId,
      time_range: timeRange,
      timing_task_id: 1
    })
    return ExamEntity.save()
      .catch(() => Promise.reject('创建考试出错'))
      .then(() => Promise.resolve('创建考试成功'))
      .unified((state, data) => {
        return res.send({
          state,
          data
        })
      })
  }
}

module.exports = resource
