const M = require('../model')
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
  }
}

module.exports = resource
