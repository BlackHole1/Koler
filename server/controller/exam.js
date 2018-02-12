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
  }
}

module.exports = resource
