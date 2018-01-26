const empty = require('is-empty')

const post = cb => {
  return (req, res, next) => {
    if (empty(req.body.email) || empty(req.body.pass)) {
      res.send({
        state: false,
        data: '账号或密码不能为空'
      })
      return false
    }
    cb(req, res, next)
  }
}

module.exports = {
  post
}
