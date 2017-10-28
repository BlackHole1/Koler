const Koa = require('koa')
const koaBody = require('koa-body')
const controller = require('./controller')
const constant = require('../src/commons/configConstant')
const jwt = require('jsonwebtoken')

let app = new Koa()

app.use(koaBody())

app.use(async (ctx, next) => {  // 同意指定域名的跨域请求
  ctx.set('Access-Control-Allow-Origin', constant.clientAddress)
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  ctx.status = 200
  await next()
})

app.use(async (ctx, next) => {  // 检测jwt，判断用户是否登录
  if (ctx.request.url === '/Api/checkLogin') {  // 绕过登录检测的jwt判断
    await next()
    return true
  }
  const authorization = ctx.get('Authorization')  // 获取header头部信息的Authorization字段
  let jwtState = {
    state: false,
    category: 'jwt'
  }
  if (authorization === '') { // 如果Authorization为空
    jwtState = {
      data: `no token detected in http header 'Authorization', 没有检测到头部信息里有Authorization字段`
    }
  }
  const token = authorization.split(' ')[1]
  /* eslint-disable */  // 此处可能存在eslint的bug，导致eslint报错，需要临时关闭下
  jwt.verify(token, constant.jwt.secret, {  // 检测token是否符合规范
    algorithms: [constant.jwt.algorithm]
  }, (err,decoded) => {
    if (err) {
      if ('TokenExpiredError' === err.name) {
        jwtState= {
          data: 'the token is expired, 令牌过期'
        }
      }
      jwtState = {
        data: 'invalid token, tolen无效'
      }
    } else {
      jwtState.state = true
    }
  })
  /* esint-enable */
  if (jwtState.state) {
    await next()
  } else {
    ctx.response.body = jwtState
  }
})

app.use(async (ctx, next) => {  // 方便后面控制层取参数
  ctx.body = ctx.request.body
  await next()
})

app.use(controller()) // 遍历控制层的文件并加入到路由里

app.use(async (ctx, next) => {  // 如果到最后没都没有返回内容，则判定找不到页面
  ctx.status = 404
  ctx.response.body = `<h1>404 error!</h1>`
})

app.listen(5020)

console.log(`服务已运行：http://localhost:5020`)
