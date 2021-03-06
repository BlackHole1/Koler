const dateFormat = require('dateformat')
let TestModel = require('../model/statics/test')

const resource = {
  getList: (req, res) => {
    const email = req.$currentUserInfo.email
    TestModel.findByEmail(email)
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
  add: (req, res) => {
    const name = req.body.name
    const email = req.$currentUserInfo.email

    let testSave = () => new TestModel({
      name,
      email,
      details: [],
      created_date: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
    })
    .save()
      .catch(() => Promise.reject('保存试卷时出错'))
      .then(() => Promise.resolve('创建试卷成功'))

    TestModel.findByEmailAndName(email, name)
      .then(data => {
        if (data.length === 1) {
          return Promise.reject('试卷名称已被使用')
        }
        return testSave()
      })
      .unified((state, data) => res.send({state, data}))
  },
  del: (req, res) => {
    const email = req.$currentUserInfo.email
    const name = req.query.name

    let testDel = () => TestModel.remove({
      email,
      name
    })
    .catch(() => Promise.reject('删除失败'))
    .then(() => Promise.resolve('删除成功'))

    TestModel.findByEmailAndName(email, name)
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('不存在此试卷')
        }
        return testDel()
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  },
  update: (req, res) => {
    const email = req.$currentUserInfo.email
    const {name, newName} = req.body
    TestModel.findByEmailAndName(email, name)
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
