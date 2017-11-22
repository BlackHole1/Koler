const mongoose = require('../../lib/mongoose')
const dateFormat = require('dateformat')

const problemsWarehouse = new mongoose.Schema({
  email: String, // 所属哪个邮箱
  name: String, // 所属哪个题库
  practiceNumber: Number, // 练习的次数
  average: Number,  // 平均分
  details: [  // 题目详情
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
  created_date: { // 题库创建时间
    type: String,
    default: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`)
  }
})

module.exports = problemsWarehouse
