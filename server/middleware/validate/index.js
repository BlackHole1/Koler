const { isEmail, isEnAndCn, isNoSymbols, isNumber, isArray, isEnAndNum } = require('../../../common/utils')

/**
 * 向浏览器返回错误信息
 * @param {Object res} res restify的res对象
 * @param {String} msg 返回错误的描述信息
 * @returns {Boolean} 返回格式为json的错误信息
 */
const returnFalse = (res, msg) => {
  res.send({
    state: false,
    data: msg
  })
}

/**
 * 检测是否存在某个参数
 * @param {*} req 要检测的req对象
 * @param {*} key 要判断的参数名
 * @returns {Boolean} 如果存在则返回true，反之亦然
 */
const checkVal = (req, key) => {
  req = req || {}
  return req.hasOwnProperty(key)
}

const problemsWarehouse = {
  add: cb => {
    return (req, res, next) => {
      if (!checkVal(req.body, 'name')) {
        return returnFalse(res, '请输入要创建的题库名称')
      }
      cb(req, res, next)
    }
  },
  update: cb => {
    return (req, res, next) => {
      if (!checkVal(req.body, 'name') || !checkVal(req.body, 'changeName')) {
        return returnFalse(res, '重命名所需参数不能为空')
      }
    }
  },
  del: cb => {
    return (req, res, next) => {
      if (!checkVal(req.query, 'name')) {
        return returnFalse(res, '请确保您要删除的题库是否存在')
      }
      cb(req, res, next)
    }
  }
}

const subject = {
  add: cb => {
    return (req, res, next) => {
      if (!checkVal(req.body, 'name') || !checkVal(req.body, 'title') || !checkVal(req.body, 'content') || !checkVal(req.body, 'score')) {
        return returnFalse(res, '值不能为空')
      }
      cb(req, res, next)
    }
  },
  del: cb => {
    return (req, res, next) => {
      if (!checkVal(req.query, 'name') || !checkVal(req.query, 'id')) {
        return returnFalse(res, '请确认传入了值')
      }
      cb(req, res, next)
    }
  },
  upload: {
    post: cb => {
      return (req, res, next) => {
        if (!checkVal(req, 'files') || !checkVal(req.files, 'file') || !checkVal(req.files.file, 'name')) {
          return returnFalse(res, '请先上传你的图片')
        }
        const uploadedFile = req.files.file
        const suffix = uploadedFile.name.split('.').pop()
        if (!/(jpg|jpeg|png)$/.test(suffix)) {
          return returnFalse(res, '上传的图片后缀必须为jpg、jpeg、png')
        }
        cb(req, res, next)
      }
    }
  }
}

const user = {
  update: {
    header: cb => {
      return (req, res, next) => {
        if (!checkVal(req, 'files') || !checkVal(req.files, 'file') || !checkVal(req.files.file, 'name')) {
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
        if (!checkVal(req.body, 'oldPassword') || !checkVal(req.body, 'newPassword') || !checkVal(req.body, 'confirmPassword')) {
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
      if (!checkVal(req.body, 'name') || !checkVal(req.body, 'email') || !checkVal(req.body, 'password')) {
        return returnFalse(res, '姓名、邮箱、密码值不能为空，请检查后重新提交')
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
      if (!checkVal(req.query, 'id')) {
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
      if (!checkVal(req.body, 'email') || !checkVal(req.body, 'pass')) {
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
      if (!checkVal(req.body, 'name')) {
        return returnFalse(res, '试卷名称不能为空')
      }
      if (!isNoSymbols(req.body.name)) {
        return returnFalse(res, '试卷名称里只能包含英文、中文')
      }
      cb(req, res, next)
    }
  },
  update: cb => {
    return (req, res, next) => {
      if (!checkVal(req.body, 'name') || !checkVal(req.body, 'newName')) {
        return returnFalse(res, '值不能为空')
      }
      cb(req, res, next)
    }
  },
  del: cb => {
    return (req, res, next) => {
      if (!checkVal(req.query, 'name')) {
        return returnFalse(res, 'name的值不能为空')
      }
      cb(req, res, next)
    }
  }
}

const testSubject = {
  update: cb => {
    return (req, res, next) => {
      if (!checkVal(req.body, 'name') || !checkVal(req.body, 'lists')) {
        return returnFalse(res, '值不能为空')
      }
      try {
        req.body.lists = JSON.parse(req.body.lists)
      } catch (e) {
        return returnFalse(res, 'lists传值错误，无法转换成JSON格式')
      }
      cb(req, res, next)
    }
  },
  del: cb => {
    return (req, res, next) => {
      if (!checkVal(req.query, 'id') || !checkVal(req.query, 'name')) {
        return returnFalse(res, 'id或name的值不能为空')
      }
      cb(req, res, next)
    }
  }
}

const exam = {
  create: cb => {
    return (req, res, next) => {
      if (req.$currentUserInfo.type === 'Student') {
        return returnFalse(res, '抱歉，你没有权限进行操作')
      }
      if (!checkVal(req.body, 'name') || !checkVal(req.body, 'time') || !checkVal(req.body, 'users') || !checkVal(req.body, 'testId') || !checkVal(req.body, 'timeRange')) {
        return returnFalse(res, '值不能为空')
      }
      if (!isNoSymbols(req.body.name)) {
        return returnFalse(res, '名称只能为数字、字母、中文')
      }
      if (!isNumber(req.body.time)) {
        return returnFalse(res, '选择的时间戳类型错误，请重新选择时间')
      }
      if (!isArray(req.body.users)) {
        return returnFalse(res, '用户类型错误，请重新选择要考试的用户')
      }
      if (!isEnAndNum(req.body.testId)) {
        return returnFalse(res, '考试id错误，请重新刷新页面')
      }
      if (!isNumber(req.body.timeRange)) {
        return returnFalse(res, '考试时间范围必须为数字，请重新选择限定时间')
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
  test,
  testSubject,
  exam
}
