const regx = {
  noSpecialSymbols: /^[\d|A-z|\u4E00-\u9FFF]+$/, // 只包含数字、字母、中文(没有其他字符返回true)
  englishAndChinese: /^[A-z|\u4E00-\u9FFF]+$/ // 只包含字母、中文(没有其他字符返回true)
}

/**
 * 获取下级称谓
 * @param {String} type 当前级别名称
 */
const subName = type => {
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
  regx,
  subName
}
