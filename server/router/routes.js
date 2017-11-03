const problemsWarehouse = require('../controller/problemsWarehouse')
const user = require('../controller/user')
const sign = require('../controller/sign')

const routes = {
  testLogin: {
    get: sign.login
  },
  'Api': {
    'problemsWarehouse': {
      'get': problemsWarehouse.getInfo
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
