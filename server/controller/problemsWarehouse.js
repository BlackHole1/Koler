const M = require('../model')
const empty = require('is-empty')
const common = require('../lib/common')

const resource = {
  getInfo: (req, res, next) => {
    let result = {}
    let PWMolde = M('problemsWarehouse')
    PWMolde.findByUserAndName('root', function (err, data) {
      if (err) {
        result = err
      } else {
        const PWData = {}
        let names = []
        data.forEach(el => {
          names.push(el.name)
        })
        PWData.count = data.length
        PWData.names = Array.from(new Set(names))
        names.forEach(el => {
          PWData[el] = {}
        })
        data.forEach(el => {
          PWData[el.name] = el
        })
        result = PWData
      }
      res.send(result)
    })
  },
  addPW: (req, res, next) => {
    const result = {
      state: false,
      data: ''
    }
    if (empty(req.bofy.name)) {
      result.data = '请输入要创建的题库名称'
    }
    const name = req.bofy.name
    let PWMolde = M('problemsWarehouse')
    const PWEntity = new PWMolde({
      user: common.jwt(req.header('Authorization')).data.data.name,
      name: name,
      practiceNumber: 0,
      average: 0,
      details: []
    })
    PWEntity.save(function (err) {
      if (err) {
        result.data = err
      } else {
        result.state = true
        result.data = '创建题库成功'
      }
      res.send(result)
    })
  }
}

module.exports = resource
