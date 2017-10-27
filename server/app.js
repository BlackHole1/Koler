const Koa = require('koa')
const koaBody = require('koa-body')
const controller = require('./controller')
const constant = require('../src/commons/configConstant')

let app = new Koa()

app.use(koaBody())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', constant.clientAddress)
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  ctx.status = 200
  await next()
})

app.use(async (ctx, next) => {
  ctx.body = ctx.request.body
  await next()
})

app.use(controller())

app.use(async (ctx, next) => {
  ctx.status = 404
  ctx.response.body = `<h1>404 error!</h1>`
})

app.listen(5020)

console.log(`服务已运行：http://localhost:5020`)
