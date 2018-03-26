const M = require('../model')
let TestModel = M('test')

const resource = {
  update: (req, res, next) => {
    let PWMolde = M('problemsWarehouse')

    const subjectIds = {}
    const {lists, name} = req.body
    const idsLength = lists.length
    const email = req.$currentUserInfo.email

    // 把数组转换对象，并以value当做key
    lists.map(id => {
      subjectIds[id] = ''
    })

    let getListByEmail = () => PWMolde.findByEmail(email)
      .then(data => {
        let subjectList = []  // 存放所有题目
        let testList = [] // 存放匹配后的题目

        // 把当前用户所有的题库里的题目放在一起
        data.map(subject => subjectList.push.apply(subjectList, subject.details))

        // 遍历数据库里的题目，把符合条件的提取出来
        let num = 0
        subjectList.some(subject => { // 这里使用some，是因为some可以使用返回true来终止循环
          if (typeof subjectIds[subject._id] !== 'undefined') {
            testList.push({ // 剔除原始的_id，让mongoose自动添加新的不重复的_id
              category: subject.category,
              created_date: subject.created_date,
              name: subject.name,
              content: subject.content,
              answer: subject.answer,
              note: subject.note,
              score: subject.score
            })
            num++ // 每次匹配成功后num+1
          }

          // 当num和lists数组长度一样是，使用返回true来终止循环，防止不必要的循环
          if (idsLength === num) return true
        })
        return testPushSubject(testList)
      })

    let testPushSubject = lists => {
      return TestModel.update({
        email: email,
        name: name
      }, {
        $push: {
          details: {
            $each: lists
          }
        }
      })
        .catch(() => Promise.reject('拉入题目失败'))
        .then(() => Promise.resolve('拉入题目成功'))
    }

    TestModel.findByEmailAndName(email, name)
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('未找到试卷名')
        }
        return getListByEmail()
      })
      .unified((state, data) => res.send({state, data}))
  },
  del: (req, res, next) => {
    const { name, id } = req.query
    const email = req.$getInfo.email

    let delTestSubject = () => TestModel.update({
      email: email,
      name: name
    }, {
      '$pull': {
        'details': {
          _id: id
        }
      }
    })
      .catch(() => Promise.reject('删除失败'))
      .then(() => Promise.resolve('删除成功'))

    TestModel.findByEmailAndName(email, name)
      .then(data => {
        if (data.length !== 1) {
          return Promise.reject('找不到此题目')
        }
        return delTestSubject()
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
