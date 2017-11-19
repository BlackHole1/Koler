const dateFormat = require('dateformat')
module.exports = {
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
      score: Number, // 分值，
      created_date: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`) // 题目创建时间
    }
  ],
  created_date: dateFormat(new Date(), `yyyy-mm-dd HH:MM:ss`) // 题库创建时间
}
