let data
let info = async(ctx, next) => {
  const user = ctx.body.user
  const pass = ctx.body.pass
  if (user === 'root' && pass === 'toor') {
    data = {
      state: true,
      data: '登录成功'
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
