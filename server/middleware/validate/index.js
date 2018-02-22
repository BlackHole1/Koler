const empty = require('is-empty')
const { isEmail, isEnAndCn } = require('../../../common/utils')

/**
 * 向浏览器返回错误信息
 * @param {Object res} res restify的res对象
 * @param {String} msg 返回错误的描述信息
 */
const returnFalse = (res, msg) => {
  res.send({
    state: false,
    data: msg
  })
}

const problemsWarehouse = {
  add: cb => {
    return (req, res, next) => {
      if (empty(req.body.name)) {
        return returnFalse(res, '请输入要创建的题库名称')
      }
      cb(req, res, next)
    }
  },
  update: cb => {
    return (req, res, next) => {
      if (empty(req.body.name) || empty(req.body.changeName)) {
        return returnFalse(res, '值不能为空')
      }
    }
  },
  del: cb => {
    return (req, res, next) => {
      if (empty(req.query.name)) {
        return returnFalse(res, '请确保您要删除的题目是否存在')
      }
      cb(req, res, next)
    }
  }
}

const subject = {
  add: cb => {
    return (req, res, next) => {
      if (empty(req.body.name) || empty(req.body.title) || empty(req.body.content) || empty(req.body.score)) {
        return returnFalse(res, '值不能为空')
      }
      cb(req, res, next)
    }
  },
  del: cb => {
    return (req, res, next) => {
      if (empty(req.query.name) || empty(req.query.id)) {
        return returnFalse(res, '请确认传入了值')
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
          return returnFalse(res, '请先上传你的图片')
        }
        const uploadedFile = req.files.file
        const suffix = uploadedFile.name.split('.').pop()
        if (!/(jpg|jpeg|png)$/.test(suffix)) {
          return returnFalse(res, '上传的图片后缀必须为jpg、jpeg、png')
        }
        if (uploadedFile.size > 1024 * 1024 * 2) {
          return returnFalse(res, '上传的图片必须在2M之内')
        }
        cb(req, res, next)
      }
    },
    password: cb => {
      return (req, res, next) => {
        if (empty(req.body.oldPassword) || empty(req.body.newPassword) || empty(req.body.confirmPassword)) {
          return returnFalse(res, '值不能为空')
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
          return returnFalse(res, '两次密码不一样')
        }
        cb(req, res, next)
      }
    }
  }
}

const users = {
  getList: cb => {
    return (req, res, next) => {
      if (req.$currentUserInfo.type === 'Student') {
        return returnFalse(res, '很抱歉，你没用权限进行列举你的下属')
      }
      cb(req, res, next)
    }
  },
  add: cb => {
    return (req, res, next) => {
      if (req.$currentUserInfo.type === 'Student') {
        return returnFalse(res, '很抱歉，你没用权限进行添加用户')
      }
      if (empty(req.body.name) || empty(req.body.email) || empty(req.body.password)) {
        return returnFalse(res, '姓名、邮箱、密码等值不能为空，请检查后重新提交')
      }
      if (!isEnAndCn(req.body.nam)) {
        return returnFalse(res, '姓名格式不正确，请确保姓名只包含中文、英文')
      }
      if (!isEmail(req.body.email)) {
        return returnFalse(res, '邮箱格式不正确')
      }
      if (req.body.password.length < 6) {
        return returnFalse(res, '密码长度小于6位')
      }
      cb(req, res, next)
    }
  },
  del: cb => {
    return (req, res, next) => {
      if (empty(req.query.id)) {
        return returnFalse(res, 'id的值不能为空')
      }
      if (req.$currentUserInfo.type === 'Student') {
        return returnFalse(res, '你没用权限进行删除用户')
      }
      cb(req, res, next)
    }
  }
}

const sign = {
  login: cb => {
    return (req, res, next) => {
      if (empty(req.body.email) || empty(req.body.pass)) {
        return returnFalse(res, '邮箱或密码不能为空')
      }
      if (!isEmail(req.body.email)) {
        return returnFalse(res, '邮箱格式不正确')
      }
      if (req.body.pass.length < 6) {
        return returnFalse(res, '密码长度小于6位')
      }
      cb(req, res, next)
    }
  }
}

const test = {
  add: cb => {
    return (req, res, next) => {
      if (empty(req.body.lists) || empty(req.body.name)) {
        return returnFalse(res, '值不能为空')
      }
      try {
        req.body.lists = JSON.parse(req.body.lists)
      } catch (e) {
        return returnFalse(res, '传值不是正常的数组格式')
      }
      cb(req, res, next)
    }
  },
  update: cb => {
    return (req, res, next) => {
      if (empty(req.body.name) || empty(req.body.newName)) {
        return returnFalse(res, '值不能为空')
      }
      cb(req, res, next)
    }
  }
}
module.exports = {
  problemsWarehouse,
  user,
  users,
  sign,
  subject,
  test
}
