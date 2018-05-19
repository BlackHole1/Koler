const server = require('../lib/server')
const socketio = require('socket.io')

const ws = socketio.listen(server.server)

ws.of('exam').on('connection', socket => {
  socket.on('create', () => {
    // Todo
  })
})
