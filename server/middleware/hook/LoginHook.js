const common = require('../../lib/common')

module.exports = (req, res, next) => {  // 请求hook，每次请求查看是否有登录
  if (req.path() === '/Api/sign') { // 跳过注册页面
    return next()
  }
  const jwtState = common.jwt(req.header('Authorization'))
  if (jwtState.state) {
    req.$getInfo = jwtState.data.data
    const UserModel = require('../../model/statics/user')
    UserModel.findByEmail(req.$getInfo.email)
      .catch(() => Promise.reject('连接数据库出错'))
      .then(data => Promise.resolve(data))
      .unified((state, data) => {
        if (state) {
          req.$currentUserInfo = data
          return next()
        } else {
          return res.send({
            state,
            data
          })
        }
      })
  } else {
    return res.send(jwtState)
  }
}
