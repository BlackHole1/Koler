const problemsWarehouse = require('../controller/problemsWarehouse')
const subject = require('../controller/subject')
const user = require('../controller/user')
const users = require('../controller/users')
const sign = require('../controller/sign')
const test = require('../controller/test')
const exam = require('../controller/exam')
const testSubject = require('../controller/testSubject')
const validate = require('../middleware/validate')

const routes = {
  testLogin: {
    get: sign.check
  },
  'Api': {
    'problemsWarehouse': {
      'get': problemsWarehouse.getInfo,
      'post': [
        validate.problemsWarehouse.add,
        problemsWarehouse.add
      ],
      'del': [
        validate.problemsWarehouse.del,
        problemsWarehouse.del
      ],
      'put': [
        validate.problemsWarehouse.update,
        problemsWarehouse.update
      ]
    },
    'subject': {
      'post': [
        validate.subject.add,
        subject.add
      ],
      'del': [
        validate.subject.del,
        subject.del
      ],
      'upload': {
        'post': [
          validate.subject.upload.post,
          subject.upload.post
        ]
      }
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
        validate.sign.login,
        sign.login
      ]
    },
    'test': {
      'get': test.getList,
      'post': [
        validate.test.add,
        test.add
      ],
      'put': [
        validate.test.update,
        test.update
      ],
      'del': [
        validate.test.del,
        test.del
      ]
    },
    'testSubject': {
      'put': [
        validate.testSubject.update,
        testSubject.update
      ],
      'del': [
        validate.testSubject.del,
        testSubject.del
      ]
    },
    'exam': {
      'post': [
        validate.exam.create,
        exam.create
      ],
      'get': [
        validate.exam.getList,
        exam.getList
      ]
    }
  }
}

module.exports = routes
