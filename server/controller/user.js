const M = require('../model')
const common = require('../lib/common')

const resource = {
  getInfo: (req, res, next) => {
    res.contentType = 'json'
    const info = {}
    common.jwt(req.header('Authorization'), (jwtState) => {
      let UserModel = M('user')
      UserModel.findByName(jwtState.data.data.name, (error, data) => {
        if (error) {
          info.state = false
          info.data = error
        } else {
          info.state = true
          info.data = data
        }
        res.send(data)
      })
    }, (jwtState) => {
      res.send(jwtState.data)
    })
  }
}

module.exports = resource
