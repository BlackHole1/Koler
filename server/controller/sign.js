const common = require('../lib/common')
const constant = require('../../src/commons/configConstant')
const jwt = require('jsonwebtoken')
const allEqual = require('all-equal')

let data
const resource = {
  login: (req, res, next) => {
    const [vEmail, vPass] = common.md5s(req.body.email, req.body.pass)
    const [email, pass] = common.md5s('root', 'toor')
    if (allEqual([vEmail, email], [vPass, pass])) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 天
        data: {
          uid: 1,
          name: 'admin'
        }
      }, constant.jwt.secret, {
        algorithm: constant.jwt.algorithm
      })
      data = {
        state: true,
        data: '登录成功！',
        token: token
      }
    } else {
      data = {
        state: false,
        data: '账号或密码错误'
      }
    }
    res.send(data)
  },
  check: (req, res, next) => {
    console.log(1)
    res.contentType = 'json'
    res.send({
      'state': true,
      'data': '登陆状态'
    })
  }
}

module.exports = resource
