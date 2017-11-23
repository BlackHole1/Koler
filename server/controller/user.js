const M = require('../model')
const common = require('../lib/common')

const resource = {
  getInfo: (req, res, next) => {
    res.contentType = 'json'
    const result = {}
    const jwtState = common.jwt(req.header('Authorization'))
    if (jwtState.state) {
      let UserModel = M('user')
      UserModel.findByName(jwtState.data.data.name, (error, data) => {
        if (error) {
          result.state = false
          result.data = error
        } else {
          result.state = true
          result.data = data
        }
        res.send(data)
      })
    } else {
      res.send(jwtState.data)
    }
  }
}

module.exports = resource
