const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const config = require('../../src/commons/configConstant')
const common = require('../lib/common')

const server = restify.createServer({
  name: 'Koler'
})

const cors = corsMiddleware({ // 解决跨域问题
  preflightMaxAge: 25,
  origins: [config.clientAddress],
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
  const jwtState = common.jwt(req.header('Authorization'))

  if (jwtState.state) {
    return next()
  } else {
    res.contentType = 'json'
    res.send(jwtState)
  }
})

module.exports = server
