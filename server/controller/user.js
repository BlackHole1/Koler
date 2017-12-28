const M = require('../model')

const resource = {
  getInfo: (req, res, next) => {
    res.contentType = 'json'
    const result = {}
    let UserModel = M('user')
    UserModel.findByName(req.$getInfo.name)
      .then(function (data) {
        result.state = true
        result.data = data
      })
      .catch(function (error) {
        result.state = false
        result.data = error
      })
      .then(function () {
        res.send(result.data)
      })
  }
}

module.exports = resource
