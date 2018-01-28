const problemsWarehouse = require('../controller/problemsWarehouse')
const subject = require('../controller/subject')
const user = require('../controller/user')
const users = require('../controller/users')
const sign = require('../controller/sign')
const validate = require('../middleware/validate')

const routes = {
  testLogin: {
    get: sign.check
  },
  'Api': {
    'problemsWarehouse': {
      'get': problemsWarehouse.getInfo,
      'post': problemsWarehouse.add,
      'del': problemsWarehouse.del,
      'put': problemsWarehouse.update
    },
    'subject': {
      'post': [
        validate.subject.add,
        subject.add
      ],
      'del': subject.del
    },
    // 只针对当前用户的操作
    'user': {
      'get': user.getInfo,
      'password': {
        'put': [
          validate.user.update.password,
          user.update.password
        ]
      },
      'header': {
        'put': [
          validate.user.update.header,
          user.update.header
        ]
      }
    },
    // 针对当前用户下属的操作
    'users': {
      'get': [
        validate.users.getList,
        users.getList
      ],
      'post': [
        validate.users.add,
        users.add
      ],
      'del': [
        validate.users.del,
        users.del
      ]
    },
    'sign': {
      'post': [
        validate.sign.post,
        sign.login
      ]
    }
  }
}

module.exports = routes
