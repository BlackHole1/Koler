module.exports = {
  clientAddress: 'http://localhost:8080', // 前端url地址
  serverAddress: 'http://localhost:5020', // 后端url地址

  mongodb: {
    url: 'mongodb://localhost:27017/koler', //  mongodb连接地址
    user: '', // mongodb账户名
    pass: ''  // mongodb密码
  },

  jwt: {
    algorithm: 'HS512',  // jwt加密算法
    secret: '_jwtKey_'  // 只是起到了定位作用，为了保持每人的key都是不一样的，服务启动时会进行自我检测，如果是_jwtKey_则将替换成随机字符串
  }
}
