const M = require('../model')
const common = require('../lib/common')

const resource = {
  getInfo: (req, res, next) => {
    res.contentType = 'json'
    const info = {}
    const jwtState = common.jwt(req.header('Authorization'))
    if (jwtState.state) {
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
    } else {
      res.send(jwtState.data)
    }
  }
}

module.exports = resource
