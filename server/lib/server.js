const restify = require('restify')
const jwt = require('jsonwebtoken')
const corsMiddleware = require('restify-cors-middleware')
const constant = require('../../src/commons/configConstant')

const server = restify.createServer({
  name: 'Koler'
})

const cors = corsMiddleware({ // 解决跨域问题
  preflightMaxAge: 25,
  origins: [constant.clientAddress],
  allowHeaders: ['Authorization']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.use(function (req, res, next) {  // 请求hook，每次请求查看是否有登录
  if (req.path() === '/Api/sign') { // 跳过注册页面
    return next()
  }
  const authorization = req.header('Authorization')
  let jwtState = {
    state: false,
    category: 'jwt'
  }
  if (authorization === '' || authorization === undefined || authorization.indexOf(' ') === -1) { // 如果Authorization为空、不规范
    jwtState.data = `no token detected in http header 'Authorization', 没有检测到头部信息里有Authorization字段`
  } else {
    const token = authorization.split(' ')[1]
    jwt.verify(token, constant.jwt.secret, {  // 检测token是否符合规范
      algorithms: [constant.jwt.algorithm]
    }, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          jwtState.data = 'the token is expired, 令牌过期'
          return false
        }
        jwtState.data = 'invalid token, token无效'
      } else {
        jwtState.state = true
      }
    })
  }
  if (jwtState.state) {
    return next()
  } else {
    res.contentType = 'json'
    res.send(jwtState)
  }
})

module.exports = server
