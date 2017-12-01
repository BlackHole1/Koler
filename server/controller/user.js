const M = require('../model')

const resource = {
  getInfo: (req, res, next) => {
    res.contentType = 'json'
    const result = {}
    let UserModel = M('user')
    UserModel.findByName(req.$getInfo.name, (error, data) => {
      if (error) {
        result.state = false
        result.data = error
      } else {
        result.state = true
        result.data = data
      }
      res.send(data)
    })
  }
}

module.exports = resource
