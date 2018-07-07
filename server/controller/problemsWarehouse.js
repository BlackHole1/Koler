let PWMolde = require('../model/statics/problemsWarehouse')

const resource = {
  getInfo: (req, res) => {
    PWMolde.findByEmail(req.$currentUserInfo.email)
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
  add: (req, res) => {
    const name = req.body.name
    const email = req.$currentUserInfo.email
    PWMolde.findByEmailAndName(email, name)
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
  del: (req, res) => {
    const name = req.query.name
    const email = req.$currentUserInfo.email
    PWMolde.findByEmailAndName(email, name)
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('找不到此题库')
        }
        return PWMolde.remove({
          email: email,
          name: name
        })
        .catch(() => Promise.reject('删除失败'))
        .then(() => Promise.resolve('删除成功'))
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  },
  update: (req, res) => {
    const {name, changeName} = req.body
    const email = req.$currentUserInfo.email
    PWMolde.findByEmailAndName(email, name)
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('找不到此题库')
        }
        return PWMolde.update({
          email: email,
          name: name
        }, {
          $set: {
            name: changeName
          }
        })
          .catch(() => Promise.reject('重命名失败'))
          .then(() => Promise.resolve('重命名成功'))
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  }
}

module.exports = resource
