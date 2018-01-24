const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const config = require('../../common/config')
const middlewareHook = require('../middleware/hook')

const server = restify.createServer({
  name: 'Koler'
})

const cors = corsMiddleware({ // 解决跨域问题
  preflightMaxAge: 25,
  origins: [config.clientAddress],
  allowHeaders: ['Authorization']
})

server.pre([cors.preflight, cors.actual])

server.use([restify.plugins.queryParser(), restify.plugins.bodyParser()])

server.use(middlewareHook())

module.exports = server
