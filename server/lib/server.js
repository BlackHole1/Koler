const restify = require('restify')
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

module.exports = server
