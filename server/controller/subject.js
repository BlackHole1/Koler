const M = require('../model')
const empty = require('is-empty')
let PWMolde = M('problemsWarehouse')

const resource = {
  add: (req, res, next) => {
    if (empty(req.body.name) || empty(req.body.title) || empty(req.body.content) || empty(req.body.score)) {
      return res.send({
        state: false,
        data: '值不能为空'
      })
    }
    const {name, title, content, score, tags, note, answer} = req.body
    const email = req.$getInfo.email
    PWMolde.findByEmailAndName(email, name)
      .catch(() => Promise.reject('连接数据库出错'))
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('找不到此题库')
        }
        return PWMolde.update({
          email: email,
          name: name
        }, {
          $push: {
            details: {
              name: title,
              content: content,
              answer: answer,
              note: note,
              category: tags,
              score: score
            }
          }
        }, {
          enable: false
        })
          .catch(() => Promise.reject('添加题目失败'))
          .then(data => Promise.resolve('添加题目成功'))
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  },
  del: (req, res, next) => {
    if (empty(req.query.name) || empty(req.query.id)) {
      return res.send({
        state: false,
        data: '请确认传入了值'
      })
    }
    const { name, id } = req.query
    const email = req.$getInfo.email
    PWMolde.findByEmailAndName(email, name)
      .catch(() => Promise.reject('连接数据库出错'))
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('找不到此题库')
        }
        return PWMolde.update({
          email: email,
          name: name
        }, {
          '$pull': {
            'details': {
              _id: id
            }
          }
        })
          .catch(() => Promise.reject('删除失败'))
          .then(() => Promise.resolve('删除成功'))
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
