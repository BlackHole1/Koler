const jwt = require('jsonwebtoken')
const empty = require('is-empty')
const common = require('../lib/common')
const constant = require('../../common/config')
const M = require('../model')

const resource = {
  login: (req, res, next) => {
    if (empty(req.body.email) || empty(req.body.pass)) {
      res.send({
        state: false,
        data: '账号或密码错误'
      })
      return false
    }

    const UserModel = M('user')
    UserModel.userDataCount({})
      .catch(() => {
        Promise.reject('数据库查询错误')
      })
      .then((count) => {  // 如果数据库里没有用户，则当前登录用户为管理员账户
        if (count === 0) {
          const UserEntity = new UserModel({
            name: '管理员',
            type: 'Admin',
            upper: '无',
            upper_name: '无',
            avatar_url: '/static/defaultUserHeader.png',
            email: req.body.email,
            password: common.md5s(req.body.pass)
          })
          UserEntity.save(function (err) {
            if (err) {
              Promise.reject('保存为管理员账户出错')
            }
          })
        }
      })
      .then(() => {
        UserModel.findByEmailAndPassword({
          email: req.body.email,
          password: common.md5s(req.body.pass)
        })
          .catch(function () {  // 数据库出错时直接跳转到最后的unified进行操作
            Promise.reject('数据库查询错误')
          })
          .then(function (data) { // 判断账号密码是否匹配
            if (empty(data)) {
              Promise.reject('账号或密码错误')
            }
            return data
          })
          .then(function (data) { // 登录成功时的逻辑
            const token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 天
              data: {
                name: data.name,
                email: req.body.email
              }
            }, constant.jwt.secret, {
              algorithm: constant.jwt.algorithm
            })
            return Promise.resolve({
              data: '登录成功',
              token: token
            })
          })
          .unified(function (state, data) { // 同时捕获resolve和reject的，进行统一操作
            data.state = state
            res.send(data)
          })
      })
  },
  check: (req, res, next) => {
    res.send({
      'state': true,
      'data': '登陆状态'
    })
  }
}

module.exports = resource
