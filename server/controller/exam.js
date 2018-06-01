const ExamModel = require('../model/statics/exam')

const resource = {
  create: (req, res, next) => {
    let {name, time, users, testId, timeRange} = req.body

    ExamModel.checkCreateTime(req.$currentUserInfo.email, time, timeRange, users)
      .then(data => {
        if (data.state) return Promise.resolve()

        return Promise.reject(`当前时间与${data.data}考试时间重合，请重新选择时间点`)
      })
      .then(data => {
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
      })
      .unified((state, data) => {
        return res.send({
          state,
          data
        })
      })
  }
}

module.exports = resource
