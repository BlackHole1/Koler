const jwt = require('jsonwebtoken')
const empty = require('is-empty')
const common = require('../lib/common')
const constant = require('../../src/commons/configConstant')
const M = require('../model')

let result
const resource = {
  login: (req, res, next) => {
    if (empty(req.body.email) || empty(req.body.pass)) {
      info = {
        state: false,
        data: '账号或密码错误'
      }
      res.send(info)
      return false
    }

    const vPass = common.md5s(req.body.pass)
    const UserModel = M('user')
    UserModel.findByEmailAndPassword({
      email: req.body.email,
      password: vPass
    }, (error, data) => {
      if (error) {
        info = {
          state: false,
          data: '数据库查询错误'
        }
      } else {
        if (empty(data)) {
          info = {
            state: false,
            data: '账号密码错误'
          }
        } else {
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 天
            data: {
              uid: 1,
              name: data.name
            }
          }, constant.jwt.secret, {
            algorithm: constant.jwt.algorithm
          })
          info = {
            state: true,
            data: '登录成功！',
            token: token
          }
        }
      }
      res.send(info)
    })
  },
  check: (req, res, next) => {
    res.contentType = 'json'
    res.send({
      'state': true,
      'data': '登陆状态'
    })
  }
}

module.exports = resource
