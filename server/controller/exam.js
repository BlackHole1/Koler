const ExamModel = require('../model/statics/exam')
const UsersModel = require('../model/statics/users')

const resource = {
  create: (req, res, next) => {
    let {name, time, users, testId, timeRange} = req.body

    ExamModel.checkCreateTime(req.$currentUserInfo.email, time, timeRange, users)
      .then(data => {
        if (data.state) return Promise.resolve()

        return Promise.reject(`当前时间与${data.data}考试时间重合，请重新选择时间点`)
      })
      .then(() => UsersModel.findUnderByEmail(req.$currentUserInfo.email) // 检查所选用户，是否为当前用户的下属用户
          .then(members => {
            let membersMap = new Map()
            members.forEach(member => {
              membersMap.set(member._id.toString(), true)
            })
            for (let i = 0; i < users.length; i++) {
              if (!membersMap.has(users[i])) {
                return Promise.reject('选择的用户，不属于你当前用户的下属用户，请重新选择')
              }
            }
            return Promise.resolve()
          })
      )
      .then(() => {
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
