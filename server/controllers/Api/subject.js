let data
let info = async(ctx, next) => {
  data = {
    count: '3', // 共多少题
    practiceNumber: '0',  // 练习了多少次
    average: '75.3' // 平均分
  }
  ctx.response.body = data
}

module.exports = {
  'method': 'get',
  'path': 'subject/:name',
  'component': info,
  'data': data
}
