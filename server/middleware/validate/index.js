const empty = require('is-empty')

const sign = {
  post: cb => {
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
}

const users = {
  del: cb => {
    return (req, res, next) => {
      if (empty(req.query.id)) {
        return res.send({
          state: false,
          data: 'id的值不能为空'
        })
      }
      if (req.$currentUserInfo.type === 'Student') {
        return res.send({
          state: false,
          data: '你没用权限进行删除用户'
        })
      }
      cb(req, res, next)
    }
  }
}

module.exports = {
  users,
  sign
}
