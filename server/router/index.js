const server = require('../lib/server')
const common = require('../lib/common')

const routes = require('./routes')

const recursion = (obj, path) => {
  return () => {
    for (let key in obj) {
      const val = obj[key]
      if (common.isObject(val)) {
        recursion(val, `${path}/${key}`)()
      } else {
        server[key](path, val)
      }
    }
  }
}

module.exports = () => recursion(routes, '')()

