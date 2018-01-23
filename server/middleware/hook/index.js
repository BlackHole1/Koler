
const fs = require('fs')

/**
 * 递归遍历hook文件，传给restify的use
 */
module.exports = () => {
  let useList = []
  let fileList = fs.readdirSync(__dirname)
  fileList.forEach(file => {
    if (file === 'index.js') return true
    useList.push(require(`${__dirname}/${file}`))
  })
  return useList
}
