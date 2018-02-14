const M = require('../model')
let ExamModel = M('exam')

const resource = {
  getList: (req, res, next) => {
    const email = req.$currentUserInfo.email
    ExamModel.findByEmail(email)
      .catch(() => Promise.reject('连接数据库失败'))
      .then(data => {
        // 把当前用户下所有的试卷名称提取出来
        let nameArr = []
        data.map(info => nameArr.push(info.name))
        return Promise.resolve(nameArr)
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  },
  update: (req, res, next) => {
    const email = req.$currentUserInfo.email
    const {name, newName} = req.body
    ExamModel.findByEmailAndName(email, name)
      .catch(() => Promise.reject('连接数据库失败'))
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('找不到此题库')
        }
        return ExamModel.update({
          email: email,
          name: name
        }, {
          $set: {
            name: newName
          }
        })
          .catch(() => Promise.reject('重命名失败'))
          .then(() => Promise.resolve('重命名成功'))
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  }
}

module.exports = resource
