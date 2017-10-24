const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller')

let app = new Koa()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  ctx.set('Access-Control-Allow-Methods', 'GET, POST')
  await next()
})

app.use(bodyParser())
app.use(controller())

app.use(async (ctx, next) => {
  ctx.response.body = `<h1>404 error!</h1>`
})

app.listen(5020)

console.log(`服务已运行：http://localhost:5020`)
