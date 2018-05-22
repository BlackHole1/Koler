const server = require('../lib/server')
const socketio = require('socket.io')
const {jwt} = require('../lib/common')

const ws = socketio.listen(server.server)

ws.of('exam').on('connection', socket => {
  socket.on('create', ({token, data}, fn) => {
    let jwtState = jwt('Bearer ' + token)
    if (!jwtState.state) {
      return fn({
        state: false,
        data: jwtState.data
      })
    }
    // TODO
    fn({
      state: true,
      data: '鉴限成功'
    })
  })
})
