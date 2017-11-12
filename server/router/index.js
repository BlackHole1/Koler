const server = require('../lib/server')
const common = require('../lib/common')

const routes = require('./routes')

const recursion = (obj, path) => {  // 针对routes.js的路由配置挂载到restify上
  return () => {
    for (let key in obj) {
      const val = obj[key]
      if (common.isObject(val)) { // 如果还有下一层路由配置
        recursion(val, `${path}/${key}`)()
      } else {
        server[key](path, val)
      }
    }
  }
}

module.exports = () => recursion(routes, '')()

