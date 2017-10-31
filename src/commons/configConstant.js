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
    secret: '_jwtKey_'  // 此处请随便写一些字符串代替，请不要使用原始的_jwtKey_值
  }
}
