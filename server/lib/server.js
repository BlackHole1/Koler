const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const config = require('../../common/config')
const common = require('../lib/common')
const M = require('../model')

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
    req.$getInfo = jwtState.data.data
    const UserModel = M('user')
    UserModel.findByEmail(req.$getInfo.email)
      .catch(() => Promise.reject('连接数据库出错'))
      .then(data => Promise.resolve(data))
      .unified((state, data) => {
        if (state) {
          req.$currentUserInfo = data
          return next()
        } else {
          return res.send({
            state,
            data
          })
        }
      })
  } else {
    res.contentType = 'json'
    return res.send(jwtState)
  }
})

module.exports = server
