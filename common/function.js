const regx = {
  noSpecialSymbols: /^[\d|A-z|\u4E00-\u9FFF]+$/ // 只包含数字、字母、中文(没有其他字符返回true)
}

module.exports = {
  regx
}
