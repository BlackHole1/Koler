const M = require('../model')
const empty = require('is-empty')

const resource = {
  getInfo: (req, res, next) => {
    let PWMolde = M('problemsWarehouse')
    PWMolde.findByEmail(req.$getInfo.email)
      .catch(() => Promise.reject('数据库查询错误'))
      .then(data => {
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
        return Promise.resolve(PWData)
      })
      .unified((state, data) => {
        res.send(data)
      })
  },
  add: (req, res, next) => {
    if (empty(req.body.name)) {
      return res.send({
        state: false,
        data: '请输入要创建的题库名称'
      })
    }
    const name = req.body.name
    const email = req.$getInfo.email
    let PWMolde = M('problemsWarehouse')
    PWMolde.findByEmailAndName1(email, name)
      .catch(() => Promise.reject('连接数据库出错'))
      .then(data => {
        if (data.length === 1) {
          return Promise.reject('题库名称已被使用')
        }
        const PWEntity = new PWMolde({
          email: email,
          name: name,
          details: []
        })
        return PWEntity.save()
          .catch(() => Promise.reject('保存数据时出错'))
          .then(() => Promise.resolve('创建题库成功'))
      })
      .unified((state, data) => res.send({
        state,
        data
      }))
  },
  del: (req, res, next) => {
    if (empty(req.query.name)) {
      res.send({
        state: false,
        data: '请确保您要删除的题目是否存在'
      })
    } else {
      const name = req.query.name
      const email = req.$getInfo.email
      let PWMolde = M('problemsWarehouse')
      PWMolde.findByEmailAndName1(email, name)
        .catch(() => Promise.reject('连接数据库出错'))
        .then(data => {
          if (data.length !== 1) {
            return Promise.reject('找不到此题库')
          }
          return PWMolde.remove({
            email: email,
            name: name
          })
          .catch(() => Promise.reject('删除失败'))
          .then(data => Promise.resolve('删除成功'))
        })
        .unified((state, data) => {
          res.send({
            state,
            data
          })
        })
    }
  },
  update: (req, res, next) => {
    const result = {
      state: false,
      data: ''
    }
    if (empty(req.body.name) || empty(req.body.changeName)) {
      result.data = '值不能为空'
      res.send(result)
    } else {
      const {name, changeName} = req.body
      const email = req.$getInfo.email
      let PWMolde = M('problemsWarehouse')
      PWMolde.findByEmailAndName(email, name, function (err, data) {
        if (err || data.length !== 1) {
          result.data = !(err) ? '找不到此题库' : err
          res.send(result)
        } else {
          PWMolde.update({
            email: email,
            name: name
          }, {
            $set: {
              name: changeName
            }
          }, {
            upsert: true
          }, function (err) {
            result.state = !(err)
            result.data = (err) ? '重命名失败' : '重命名成功'
            res.send(result)
          })
        }
      })
    }
  }
}

module.exports = resource
