require('./lib/prototypes')()
const server = require('./lib/server')
require('./router/index')()

server.listen('5020', 'localhost', function () {
  console.log('%s active in %s ', server.name, server.url)
})
