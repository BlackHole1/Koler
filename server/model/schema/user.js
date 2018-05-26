const mongoose = require('../../lib/mongoose')
const dateFormat = require('dateformat')

const user = new mongoose.Schema({
  name: String, // 用户姓名
  email: String,  // 用户邮箱
  password: String, // 用户密码
  type: String, // 用户类别
  upper: String,  // 用户上级类别
  upper_email: String,  // 用户上级邮箱
  upper_name: String, // 用户上级名称
  under: String,  // 下级用户类别
  avatar_url: { // 默认头像地址
    type: String,
    default: '/static/userHeader/defaultUserHeader.png'
  },
  created_date: { // 用户创建时间
    type: String,
    default: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
  }
})

module.exports = user
