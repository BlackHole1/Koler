const fs = require('fs')
const uuidv1 = require('uuid/v1')
const M = require('../model')
const common = require('../lib/common')
const empty = require('is-empty')
let UserModel = M('user')

const resource = {
  getInfo: (req, res, next) => {
    res.contentType = 'json'
    const result = {}
    UserModel.findByName(req.$getInfo.name)
      .then(function (data) {
        result.state = true
        result.data = data
      })
      .catch(function (error) {
        result.state = false
        result.data = error
      })
      .then(function () {
        res.send(result.data)
      })
  },
  update: {
    password: (req, res, next) => {
      if (empty(req.body.oldPassword) || empty(req.body.newPassword) || empty(req.body.confirmPassword)) {
        return res.send({
          state: false,
          data: '值不能为空'
        })
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return res.send({
          state: false,
          data: '两次密码不一样'
        })
      }
      UserModel.findByEmailAndPassword({
        email: req.$getInfo.email,
        password: common.md5(req.body.oldPassword)
      })
        .catch(() => Promise.reject('连接数据库失败'))
        .then(data => empty(data) ? Promise.reject('旧密码错误') : data)
        .then(data => {
          return UserModel.update({
            email: req.$getInfo.email,
            password: common.md5(req.body.oldPassword)
          }, {
            password: common.md5(req.body.newPassword)
          })
            .catch(() => Promise.reject('更新数据时失败'))
            .then(data => Promise.resolve('修改密码成功'))
        })
        .unified((state, data) => {
          res.send({
            state,
            data
          })
        })
    },
    header: (req, res, next) => {
      const uploadedFile = req.files.file
      const suffix = uploadedFile.name.split('.').pop()
      const newFilePath = `/static/userHeader/${uuidv1()}.${suffix}`
      const email = req.$getInfo.email
      /**
       * 上传新的头像文件，删除旧的文件
       * 更新数据库里的头像url
       */
      UserModel.findByEmail(email)
        .catch(() => Promise.reject('连接数据库失败'))
        .then(data => {
          const readStream = fs.createReadStream(uploadedFile.path)
          const writeStream = fs.createWriteStream('..' + newFilePath)
          readStream.pipe(writeStream)
          readStream.on('end', () => {
            // 删除上传时遗留的临时文件
            fs.unlinkSync(uploadedFile.path)
              // 判断当前头像是否为系统默认头像
            if (!data.avatar_url.includes('defaultUserHeader')) {
              // 删除旧的头像文件
              fs.unlinkSync(`..${data.avatar_url}`)
            }
          })
          // 更新数据库里的头像信息
          return UserModel.update({
            email
          }, {
            $set: {
              avatar_url: newFilePath
            }
          }, {
            upsert: true
          })
            .catch(() => Promise.reject('更新头像失败'))
            .then(() => Promise.resolve('更新头像成功'))
        })
        .unified((state, data) => {
          res.send({
            state,
            data
          })
        })
    }
  }
}

module.exports = resource
