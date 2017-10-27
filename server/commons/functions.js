const crypto = require('crypto')

const fun = {
  isArray (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  },
  isObject (obj) {
    return obj !== null && typeof obj === 'object'
  },
  md5 (str) {
    return crypto.createHash('md5').update(str, 'utf-8').digest('hex')
  },
  md5s () {
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
  integrateJudge (...arrays) {
    const result = []
    for (let i = 0; i < arrays.length; i++) {
      if (!this.isArray(arrays[i])) throw new Error(`arguments must be a Array`)
      if (arrays[i].length < 1) throw new Error(`The number of array values must be greater than one`)
      result.push(!arrays[i].some((value, index) => value !== arrays[i][0]))
    }
    return result.every((v) => v === true)
  }
}

module.exports = fun
