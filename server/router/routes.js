const problemsWarehouse = require('../controller/problemsWarehouse')
const subject = require('../controller/subject')
const user = require('../controller/user')
const users = require('../controller/users')
const sign = require('../controller/sign')

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
      'post': subject.add,
      'del': subject.del
    },
    // 只针对当前用户的操作
    'user': {
      'get': user.getInfo,
      'password': {
        'put': user.update('password')
      },
      'header': {
        'put': user.update('header')
      }
    },
    // 针对当前用户下属的操作
    'users': {
      'post': users.add
    },
    'sign': {
      'post': sign.login
    }
  }
}

module.exports = routes
