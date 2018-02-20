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
 * @param {Array} arr 要检测的数组
 * @returns {Boolean} 为数组时返回true
 */
const isArray = arr => {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 判断传值是否为字符串
 * @param {String} str 要检测的字符
 * @returns {Boolean} 为字符串时返回true
 */
const isString = str => {
  return typeof str === 'string'
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
  return regx.test(str)
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

/**
 * 向sessionStorage中原始的值追加数据
 * @param {Strin || Number} key sessionStorage中将要追加的key
 * @param {*} val 要追加的数据
 * @returns {Object || Array || String} 如果成功将返回追加后的内容，如果
 */
const sessionStorageAppend = (key, val, deDuplication = false) => {
  if ([isNumber, isString].every(type => !type(key))) return console.error(new ReferenceError('key is not Number or String'))
  if ([isNumber, isString, isArray, isObject].every(type => !type(val))) return console.error(new TypeError('value is not Number or String or Array or Object'))

  let StorageData = sessionStorage.getItem(key)
  let newData = null

  if (StorageData !== null && StorageData !== '') {
    try {
      newData = JSON.parse(StorageData)
    } catch (e) {
      return console.error(new SyntaxError(`in the sessionStorage, ${StorageData} is not a disqualification`))
    }
  }

  if (isArray(val)) {
    newData = (newData === null) ? [] : newData
    newData.push.apply(newData, val)
    newData = deDuplication ? [...new Set(newData)] : newData
  }

  if (isObject(val)) {
    newData = (newData === null) ? {} : newData
    for (let key in val) {
      newData[key] = val[key]
    }
  }

  if (isNumber(val)) {
    newData = (newData === null) ? '' : newData
    newData = Number(newData.toString() + val)
  }

  if (isString(val)) {
    newData = (newData === null) ? '' : newData
    newData = newData + val
  }

  sessionStorage.setItem(key, JSON.stringify(newData))
  return newData
}

module.exports = {
  isString,
  isNumber,
  isObject,
  isArray,
  isNoSymbols,
  isEnAndCn,
  isEmail,
  getSubName,
  sessionStorageAppend
}
