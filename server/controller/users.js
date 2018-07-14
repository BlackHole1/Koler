const empty = require('is-empty')
const dateFormat = require('dateformat')
const common = require('../lib/common')
const UsersModel = require('../model/statics/users')
const UserModel = require('../model/statics/user')

const resource = {
  getList: (req, res) => {
    UsersModel.findUnderByEmail(req.$currentUserInfo.email)
      .then(data => Promise.resolve(data))
      .unified((state, data) => {
        return res.send({
          state,
          data
        })
      })
  },
  add: (req, res) => {
    const {name, email, password} = req.body
    UserModel.findByEmail(email)
      .then(data => {
        if (!empty(data)) {
          return Promise.reject('用户已经存在，请更换邮箱重新添加')
        }
        const UserEntity = new UserModel({
          name,
          email,
          password: common.md5(password),
          type: req.$currentUserInfo.under,
          upper: req.$currentUserInfo.type,
          upper_email: req.$currentUserInfo.email,
          upper_name: req.$currentUserInfo.name,
          under: (req.$currentUserInfo.type === 'Admin') ? 'Student' : '无',
          created_date: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
        })
        return UserEntity.save()
          .catch(() => Promise.reject('添加用户出错'))
          .then(() => Promise.resolve('添加用户成功'))
      })
      .unified((state, data) => {
        return res.send({
          state,
          data
        })
      })
  },
  del: (req, res) => {
    const id = req.query.id
    UsersModel.findUnderByEmailAndId(req.$currentUserInfo.email, id)
      .catch(err => {
        if (err === null) {
          return Promise.reject('没有找到此用户')
        }
      })
      .then(data => {
        return UserModel.remove({
          email: data.email,
          _id: id
        })
          .catch(() => Promise.reject('删除失败'))
          .then(() => Promise.resolve('删除成功'))
      })
      .unified((state, data) => {
        return res.send({
          state,
          data
        })
      })
  }
}

module.exports = resource
