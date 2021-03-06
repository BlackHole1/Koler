const server = require('../lib/server')
const routes = require('./routes')
const {isObject, isArray} = require('../../common/utils')

const recursion = (obj, path = '') => {  // 针对routes.js的路由配置挂载到restify上
  return () => {
    for (let key in obj) {
      const val = obj[key]
      if (isObject(val)) { // 如果是对象，说明还有下一层路由配置
        recursion(val, `${path}/${key}`)()
      } else if (isArray(val)) { // 如果是数组，则是验证与核心代码分离的
        if (val.length !== 2) {
          return new Error('配置路由时，数组必须有两个值')
        }
        let validateFun = val[0]
        let mainFun = val[1]
        server[key](path, validateFun(mainFun))
      } else {  // 如果不是对象、数组。说明是控制层函数
        server[key](path, val)
      }
    }
  }
}

module.exports = () => recursion(routes)()

