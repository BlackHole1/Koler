const fun = require('../../commons/functions')

let data
let info = async(ctx, next) => {
  const [vEmail, vPass] = fun.md5s(ctx.body.email, ctx.body.pass)
  const [email, pass] = fun.md5s('root', 'toor')
  if (fun.integrateJudge([vEmail, email], [vPass, pass])) {
    data = {
      state: true,
      data: '登录成功！三秒后跳转到主页'
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
