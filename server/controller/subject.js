const M = require('../model')
const common = require('../lib/common')
const empty = require('is-empty')

const resource = {
  add: (req, res, next) => {
    const result = {
      state: false,
      data: ''
    }
    if (empty(req.body.name) || empty(req.body.title) || empty(req.body.content) || empty(req.body.score)) {
      result.data = '值不能为空'
      res.send(result)
    } else {
      const {name, title, content, score, tags, note, answer} = req.body
      const email = common.jwt(req.header('Authorization')).data.data.email
      let PWMolde = M('problemsWarehouse')
      PWMolde.findByEmailAndName(email, name, function (err, data) {
        if (err || data.length !== 1) {
          result.data = !(err) ? '找不到此题库' : err
          res.send(result)
        } else {
          PWMolde.update({
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
          }, function (err) {
            result.state = !(err)
            result.data = (err) ? '添加题目失败' : '添加题目成功'
            res.send(result)
          })
        }
      })
    }
  }
}

module.exports = resource
