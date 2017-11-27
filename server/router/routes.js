const problemsWarehouse = require('../controller/problemsWarehouse')
const subject = require('../controller/subject')
const user = require('../controller/user')
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
      'post': subject.add
    },
    'user': {
      'get': user.getInfo
    },
    'sign': {
      'post': sign.login
    }
  }
}

module.exports = routes
