const restify = require('restify')
const jwt = require('jsonwebtoken')
const corsMiddleware = require('restify-cors-middleware')
const constant = require('../../src/commons/configConstant')

const server = restify.createServer({
  name: 'Koler'
})

const cors = corsMiddleware({
  preflightMaxAge: 25,
  origins: [constant.clientAddress],
  allowHeaders: ['Authorization']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.use(function (req, res, next) {
  if (req.path() === '/Api/sign') {
    return next()
  }
  const authorization = req.header('Authorization')
  let jwtState = {
    state: false,
    category: 'jwt'
  }
  if (authorization === '' || authorization.indexOf(' ') === -1) { // 如果Authorization为空、不规范
    jwtState.data = `no token detected in http header 'Authorization', 没有检测到头部信息里有Authorization字段`
  }
  const token = authorization.split(' ')[1]
  /* eslint-disable */  // 此处可能存在eslint的bug，导致eslint报错，需要临时关闭下
  jwt.verify(token, constant.jwt.secret, {  // 检测token是否符合规范
    algorithms: [constant.jwt.algorithm]
  }, (err,decoded) => {
    if (err) {
      if ('TokenExpiredError' === err.name) {
        jwtState.data = 'the token is expired, 令牌过期'
      }
      jwtState.data = 'invalid token, token无效'
    } else {
      jwtState.state = true
    }
  })
  /* esint-enable */
  if (jwtState.state) {
    return next()
  } else {
    res.contentType = 'json'
    res.send(jwtState)
  }
})

module.exports = server
