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
  getList: cb => {
    return (req, res, next) => {
      if (req.$currentUserInfo.type === 'Student') {
        return res.send({
          state: false,
          data: '很抱歉，你没用权限进行列举你的下属'
        })
      }
      cb(req, res, next)
    }
  },
  add: cb => {
    return (req, res, next) => {
      if (empty(req.body.name) || empty(req.body.email) || empty(req.body.password)) {
        return res.send({
          state: false,
          data: '姓名、邮箱、密码等值不能为空，请检查后重新提交'
        })
      }
      if (req.$currentUserInfo.type === 'Student') {
        return res.send({
          state: false,
          data: '很抱歉，你没用权限进行添加用户'
        })
      }
      cb(req, res, next)
    }
  },
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

const user = {
  update: {
    header: cb => {
      return (req, res, next) => {
        if (empty(req.files) || empty(req.files.file) || empty(req.files.file.name)) {
          return res.send({
            state: false,
            data: '请先上传你的图片'
          })
        }
        const uploadedFile = req.files.file
        const suffix = uploadedFile.name.split('.').pop()
        if (!/(jpg|jpeg|png)$/.test(suffix)) {
          return res.send({
            state: false,
            data: '上传的图片后缀必须为jpg、jpeg、png'
          })
        }
        if (uploadedFile.size > 1024 * 1024 * 2) {
          return res.send({
            state: false,
            data: '上传的图片必须在2M之内'
          })
        }
        cb(req, res, next)
      }
    },
    password: cb => {
      return (req, res, next) => {
        if (empty(req.body.oldPassword) || empty(req.body.newPassword) || empty(req.body.confirmPassword)) {
          return res.send({
            state: false,
            data: '值不能为空'
          })
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
          return res.send({
            state: false,
            data: '两次密码不一样'
          })
        }
        cb(req, res, next)
      }
    }
  }
}

module.exports = {
  user,
  users,
  sign
}
