const M = require('../model')
let TestModel = M('test')

const resource = {
  getList: (req, res, next) => {
    const email = req.$currentUserInfo.email
    TestModel.findByEmail(email)
      .catch(() => Promise.reject('连接数据库失败'))
      .then(data => {
        return Promise.resolve(data)
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  },
  add: (req, res, next) => {
    const name = req.body.name
    const email = req.$currentUserInfo.email

    let testSave = () => new TestModel({
      name,
      email,
      details: []
    })
    .save()
      .catch(() => Promise.reject('保存试卷时出错'))
      .then(() => Promise.resolve('创建试卷成功'))

    TestModel.findByEmailAndName(email, name)
      .catch(() => Promise.reject('连接试卷数据库失败'))
      .then(data => {
        if (data.length === 1) {
          return Promise.reject('试卷名称已被使用')
        }
        return testSave()
      })
      .unified((state, data) => res.send({state, data}))
  },
  update: (req, res, next) => {
    const email = req.$currentUserInfo.email
    const {name, newName} = req.body
    TestModel.findByEmailAndName(email, name)
      .catch(() => Promise.reject('连接数据库失败'))
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('找不到此题库')
        }
        return TestModel.update({
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
