const mongoose = require('../../lib/mongoose')
const dateFormat = require('dateformat')

const exam = new mongoose.Schema({
  name: String, // 试卷名称
  email: String, // 所属哪个邮箱
  practiceNumber: {  // 练习次数
    type: Number,
    default: 0
  },
  average: {  // 平均分
    type: Number,
    default: 0
  },
  total: {  // 总分
    type: Number,
    default: 0
  },
  details: [
    {
      name: String, // 题目标题
      content: String,  // 题目内容
      answer: String, // 答案
      note: String, // 备注
      category: Array,  // 所属类别
      score: Number, // 分值
      created_date: { // 题目创建时间
        type: String,
        default: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
      }
    }
  ],
  created_date: { // 试卷创建时间
    type: String,
    default: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
  }
})

module.exports = exam
