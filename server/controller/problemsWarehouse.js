const M = require('../model')
const empty = require('is-empty')
const common = require('../lib/common')

const resource = {
  getInfo: (req, res, next) => {
    let result = {}
    let PWMolde = M('problemsWarehouse')
    PWMolde.findByEmailAndName(common.jwt(req.header('Authorization')).data.data.email, function (err, data) {
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
    if (empty(req.body.name)) {
      result.data = '请输入要创建的题库名称'
    }
    const name = req.body.name
    let PWMolde = M('problemsWarehouse')
    PWMolde.findByName(name, function (err, data) {
      if (err || data.length > 0) {
        result.data = !(err) ? '题库名称已被使用' : err
        res.send(result)
      } else {
        const PWEntity = new PWMolde({
          email: common.jwt(req.header('Authorization')).data.data.email,
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
    })
  }
}

module.exports = resource
