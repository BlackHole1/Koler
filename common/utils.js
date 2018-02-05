/**
 * 判断字符串是否为数字，代码取自:https://github.com/jonschlinkert/is-number
 * @param {String} str 将要检测的字符串
 * @returns {Boolean} 为数字时返回true
 */
const isNumber = num => {
  let type = typeof num
  if (type === 'string') {
    if (num.trim() === '') {
      return false
    }
  } else if (type !== 'number') {
    return false
  }
  return (num - num + 1) === 1
}

/**
 * 判断传值是否为Object对象
 * @param {Object} obj 要检测的对象
 * @returns {Boolean} 为对象时返回true
 */
const isObject = obj => {
  return obj != null && typeof obj === 'object' && Array.isArray(obj) === false && Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 判断传值是否为数组
 * @param {Array} obj 要检测的数组
 * @returns {Boolean} 为数组时返回true
 */
const isArray = arr => {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 判断字符串是否只包含数字、字母、中文
 * @param {String} str 将要匹配的字符串
 * @returns {Boolean} 没有其他字符串时返回true
 */
const isNoSymbols = str => {
  let regx = /^[\d|A-z|\u4E00-\u9FFF]+$/
  return regx.test(str)
}

/**
 * 判断字符串是否只包含字母、中文
 * @param {String} str 将要匹配的字符串
 * @returns {Boolean} 没有其他字符串时返回true
 */
const isEnAndCn = str => {
  let regx = /^[A-z|\u4E00-\u9FFF]+$/
  return regx.test(str)
}

/**
 * 判断字符串是否为邮箱格式
 * @param {String} str 将要匹配的字符串
 * @returns {Boolean} 是邮箱正则返回true
 */
const isEmail = str => {
  let regx = /.+@.+\..+/
  regx.test(str)
}

/**
 * 获取下级称谓
 * @param {String} type 当前级别名称
 * @returns {String} 返回"老师"、"学生"、""
 */
const getSubName = type => {
  let name = ''
  switch (type) {
    case 'Admin':
      name = '老师'
      break
    case 'Teacher':
      name = '学生'
      break
    default:
      name = ''
      break
  }
  return name
}

module.exports = {
  isNumber,
  isObject,
  isArray,
  isNoSymbols,
  isEnAndCn,
  isEmail,
  getSubName
}
