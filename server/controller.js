const fs = require('fs')
const path = require('path')

function traverse (router, dir) {
  const controllersPath = fs.readdirSync(path.join(__dirname, dir))
  for (let i = 0; i < controllersPath.length; i++) {
    const currentPath = path.join(__dirname, dir, controllersPath[i])
    if (fs.statSync(currentPath).isFile()) {
      addMapping(router, currentPath, dir.substring(11) + '/')
    } else {
      traverse(router, path.join(dir, controllersPath[i]))
    }
  }
}

function addMapping (router, mapping, conDir) {
  conDir = conDir.replace(/\\/g, '/')
  const map = require(mapping)
  const method = map.method
  const path = map.path
  const component = map.component
  if (['get', 'post'].includes(method)) {
    router[method](conDir + path, component)
  } else {
    console.log(`暂不支持此method模式，目前只支持get、post。文件位置：${mapping}`)
  }
}

module.exports = function (dir) {
  let controllersDir = dir || 'controllers'
  let router = require('koa-router')()
  traverse(router, controllersDir)
  return router.routes()
}
