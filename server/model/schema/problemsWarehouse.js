const dateFormat = require('dateformat')
module.exports = {
  name: String,
  upper: String,
  upper_name: String,
  created_date: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
}
