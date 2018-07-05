const ExamModel = require('../model/statics/exam')
const UsersModel = require('../model/statics/users')
const TestModel = require('../model/statics/test')

const resource = {
  create: (req, res, next) => {
    let {name, time, users, testId, timeRange} = req.body

    ExamModel.checkCreateTime(req.$currentUserInfo.email, time, timeRange, users)
      .then(data => {
        if (data.state) return Promise.resolve()

        return UsersModel.findById(data.data.userId)
          .then(userInfo => Promise.reject(`选择的 ${userInfo.name} 用户已经参加了 ${data.data.examName} 考试，与当前时间重合，请重新选择时间点`)).catch()
      })
      .then(() => UsersModel.findUnderByEmail(req.$currentUserInfo.email) // 检查所选用户，是否为当前用户的下属用户
          .then(members => {
            let usersName = []
            let membersMap = new Map()
            members.forEach(member => {
              membersMap.set(member._id.toString(), member.name)
            })
            for (let i = 0; i < users.length; i++) {
              if (!membersMap.has(users[i])) {
                return Promise.reject('选择的用户，不属于你当前用户的下属用户，请重新选择')
              }
              usersName.push(membersMap.get(users[i]))
            }
            return Promise.resolve(usersName)
          })
      )
      .then(usersName => TestModel.findById(testId)
        .then(test => {
          if (test === null) {
            return Promise.reject('没有找到此试卷id，请确定试卷id是否正确')
          }
          return Promise.resolve({
            testName: test.name,
            usersName
          })
        })
      )
      .then(({testName, usersName}) => {
        let ExamEntity = new ExamModel({
          name: name,
          email: req.$currentUserInfo.email,
          time: time,
          users: users,
          users_name: usersName,
          test_id: testId,
          test_name: testName,
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
  },
  getList: (req, res, next) => {
    ExamModel.findByEmail(req.$currentUserInfo.email)
    .unified((state, data) => {
      return res.send({
        state,
        data
      })
    })
  }
}

module.exports = resource
