const M = require('../model')
const common = require('../lib/common')
const empty = require('is-empty')

const resource = {
  getInfo: (req, res, next) => {
    res.contentType = 'json'
    const result = {}
    let UserModel = M('user')
    UserModel.findByName(req.$getInfo.name)
      .then(function (data) {
        result.state = true
        result.data = data
      })
      .catch(function (error) {
        result.state = false
        result.data = error
      })
      .then(function () {
        res.send(result.data)
      })
  },
  update: (model) => {
    const password = (req, res, next) => {
      if (empty(req.body.oldPassword) || empty(req.body.newPassword) || empty(req.body.confirmPassword)) {
        return res.send({
          state: false,
          data: '值不能为空'
        })
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return res.send({
          state: false,
          data: '两次密码不一样'
        })
      }
      let UserModel = M('user')
      UserModel.findByEmailAndPassword({
        email: req.$getInfo.email,
        password: common.md5(req.body.oldPassword)
      })
        .catch(() => Promise.reject('连接数据库失败'))
        .then(data => empty(data) ? Promise.reject('旧密码错误') : data)
        .then(data => {
          return UserModel.update({
            email: req.$getInfo.email,
            password: common.md5(req.body.oldPassword)
          }, {
            password: common.md5(req.body.newPassword)
          })
            .catch(() => Promise.reject('更新数据时失败'))
            .then(data => Promise.resolve('修改密码成功'))
        })
        .unified((state, data) => {
          res.send({
            state,
            data
          })
        })
    }
    const header = (req, res, next) => {
      //
    }
    return model === 'password' ? password : header
  }
}

module.exports = resource
