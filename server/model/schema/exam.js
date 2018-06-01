const mongoose = require('../../lib/mongoose')
const dateFormat = require('dateformat')

const exam = new mongoose.Schema({
  name: String, // 考试名称
  email: String,  // 考试安排人邮箱
  time: String, // 开始考试时间
  users: Array,  // 要考试的人员
  score: { // 考试分数
    type: Number,
    default: 0
  },
  test_id: String, // 试卷id
  test_name: String, // 试卷名称
  time_range: Number, // 考试限定时间 (单位: 分)
  time_use: Number, // 考试所用时间
  timing_task_id: Number, // 定时任务id
  created_date: { // 考试创建时间
    type: String,
    default: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
  }
})

module.exports = exam
