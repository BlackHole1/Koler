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
    UserModel.userDataCount({}) // 此处会先跳转到下一个catach，再由下一个catch进入到unified
      .catch(() => Promise.reject('数据库查询错误'))
      .then((count) => {  // 如果数据库里没有用户，则当前登录用户为管理员账户
        if (count === 0) {
          const UserEntity = new UserModel({
            name: '管理员',
            email: req.body.email,
            password: common.md5s(req.body.pass),
            type: 'Admin',
            upper: '无',
            upper_name: '无'
          })
          return UserEntity.save(err => {
            (err) ? Promise.reject('保存为管理员账户出错') : Promise.resolve()
          })
        }
      })
      .then(() => Promise.resolve(UserModel.findByEmailAndPassword({
        email: req.body.email,
        password: common.md5(req.body.pass)
      })))
      .catch(() => Promise.reject('数据库查询错误')) // 数据库出错时直接跳转到最后的unified进行操作
      .then(data => empty(data) ? Promise.reject('账号或密码错误') : data) // 判断账号密码是否匹配
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
      .unified((state, data) => res.send({ // 同时捕获resolve和reject的，进行统一操作
        state,
        data: state ? data.data : data,
        token: data.token
      }))
  },
  check: (req, res, next) => {
    res.send({
      'state': true,
      'data': '登陆状态'
    })
  }
}

module.exports = resource
