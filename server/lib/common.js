const crypto = require('crypto')

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
  }
}

module.exports = common
