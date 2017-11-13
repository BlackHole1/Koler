const mongoose = require('../../lib/mongoose')
const dateFormat = require('dateformat')

const user = new mongoose.Schema({
  name: String,
  avatar_url: {
    type: String,
    default: '/static/defaultUserHeader.png'
  },
  type: String,
  upper: String,
  upper_name: String,
  created_date: {
    type: String,
    default: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
  },
  eamil: String,
  password: String
})

module.exports = user
