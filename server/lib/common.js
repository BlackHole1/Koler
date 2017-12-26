const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../../common/config')
const common = {
  isObject: (obj) => {
    return obj != null && typeof obj === 'object' && Array.isArray(obj) === false && Object.prototype.toString.call(obj) === '[object Object]'
  },
  isArray: (arr) => {
    return Object.prototype.toString.call(arr) === '[object Array]'
  },
  md5 (str) { // 单个字符串md5加密
    if (str) return crypto.createHash('md5').update(str, 'utf-8').digest('hex')
    return str
  },
  md5s () { // 多字符串md5加密
    let md5Text = []
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        if (this.isObject(arguments[i])) throw new Error(`arguments can't be a Object`)
        md5Text.push(this.md5(arguments[i]))
      }
      return md5Text
    }
    return this.md5(arguments[0])
  },
  jwt (authorization) { // jwt验证及返回解码后的数据
    let jwtState = {
      state: false,
      category: 'jwt'
    }
    if (authorization === '' || authorization === undefined || authorization.indexOf(' ') === -1) { // 如果Authorization为空、不规范
      jwtState.data = `no token detected in http header 'Authorization', 没有检测到头部信息里有Authorization字段`
    } else {
      const token = authorization.split(' ')[1]
      jwt.verify(token, config.jwt.secret, {  // 检测token是否符合规范
        algorithms: [config.jwt.algorithm]
      }, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            jwtState.data = 'the token is expired, 令牌过期'
          }
          jwtState.data = 'invalid token, token无效'
        } else {
          jwtState.state = true
          jwtState.data = decoded
        }
      })
    }
    return jwtState
  }
}

module.exports = common
