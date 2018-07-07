let PWMolde = require('../model/statics/problemsWarehouse')
const uuidv1 = require('uuid/v1')
const fs = require('fs')

const resource = {
  add: (req, res) => {
    const {name, title, content, score, tags, note, answer} = req.body
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
          $push: {
            details: {
              name: title,
              content: content,
              answer: answer,
              note: note,
              category: tags,
              score: score
            }
          }
        }, {
          enable: false
        })
          .catch(() => Promise.reject('添加题目失败'))
          .then(() => Promise.resolve('添加题目成功'))
      })
      .unified((state, data) => {
        res.send({
          state,
          data
        })
      })
  },
  del: (req, res) => {
    const { name, id } = req.query
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
          '$pull': {
            'details': {
              _id: id
            }
          }
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
  upload: {
    post: (req, res) => {
      const uploadedFile = req.files.file
      const suffix = uploadedFile.name.split('.').pop()
      const newFilePath = `/static/subject/${uuidv1()}.${suffix}`

      const readStream = fs.createReadStream(uploadedFile.path)
      const writeStream = fs.createWriteStream('..' + newFilePath)
      readStream.pipe(writeStream)
      res.send({
        state: true,
        data: newFilePath
      })
    }
  }
}

module.exports = resource
