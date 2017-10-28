const fun = require('../../commons/functions')
const constant = require('../../../src/commons/configConstant')
const jwt = require('jsonwebtoken')

let data
let info = async(ctx, next) => {
  const [vEmail, vPass] = fun.md5s(ctx.body.email, ctx.body.pass)
  const [email, pass] = fun.md5s('root', 'toor')
  if (fun.integrateJudge([vEmail, email], [vPass, pass])) {
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
      data: '登录成功！三秒后跳转到主页',
      token: token
    }
  } else {
    data = {
      state: false,
      data: '账号或密码错误'
    }
  }
  ctx.response.body = data
}

module.exports = {
  'method': 'post',
  'path': 'checkLogin',
  'component': info,
  'data': data
}
