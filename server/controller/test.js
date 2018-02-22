const M = require('../model')
let TestModel = M('test')

const resource = {
  getList: (req, res, next) => {
    const email = req.$currentUserInfo.email
    TestModel.findByEmail(email)
      .catch(() => Promise.reject('连接数据库失败'))
      .then(data => {
        // 把当前用户下所有的试卷名称提取出来
        let nameArr = []
        data.map(info => nameArr.push(info.name))
        return Promise.resolve(nameArr)
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  },
  add: (req, res, next) => {
    let PWMolde = M('problemsWarehouse')

    const subjectIds = {}
    const {lists, name} = req.body
    const idsLength = lists.length
    const email = req.$currentUserInfo.email

    // 把数组转换对象，并以value当做key
    lists.map(id => {
      subjectIds[id] = ''
    })

    let testSave = () => PWMolde.findByEmail(email)
      .catch(() => Promise.reject('连接题库数据库失败'))
      .then(data => {
        let subjectList = []  // 存放所有题目
        let testList = [] // 存放匹配后的题目

        // 把当前用户所有的题库里的题目放在一起
        data.map(subject => subjectList.push.apply(subjectList, subject.details))

        // 遍历数据库里的题目，把符合条件的提取出来
        let num = 0
        subjectList.some(subject => { // 这里使用some，是因为some可以使用返回true来终止循环
          if (typeof subjectIds[subject._id] !== 'undefined') {
            testList.push(subject)
            num++ // 每次匹配成功后num+1
          }

          // 当num和lists数组长度一样是，使用返回true来终止循环，防止不必要的循环
          if (idsLength === num) return true
        })

        const TestEntity = new TestModel({
          name,
          email,
          details: testList
        })
        return TestEntity.save()
          .catch(() => Promise.reject('保存试卷时出错'))
          .then(() => Promise.resolve('创建试卷成功'))
      })

    TestModel.findByEmailAndName(email, name)
      .catch(() => Promise.reject('连接试卷数据库失败'))
      .then(data => {
        if (data.length === 1) {
          return Promise.reject('试卷名称已被使用')
        }
        return testSave()
      })
      .unified((state, data) => res.send({state, data}))
  },
  update: (req, res, next) => {
    const email = req.$currentUserInfo.email
    const {name, newName} = req.body
    TestModel.findByEmailAndName(email, name)
      .catch(() => Promise.reject('连接数据库失败'))
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('找不到此题库')
        }
        return TestModel.update({
          email: email,
          name: name
        }, {
          $set: {
            name: newName
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
