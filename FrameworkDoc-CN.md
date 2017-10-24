# Koler

> 项目架构说明

[**English Framework explain**](https://github.com/BlackHole1/Koler/blob/master/FrameworkDoc.md)

## 目录说明

```bash
Koler
  ······
  ├─logs/   # pm2日志目录
  │  ├─app-err.log  # Vue项目错误日志
  │  ├─app-out.log  # Vue项目输出日志
  │  ├─README.md
  │  ├─server-err.log # Koa项目错误日志
  │  └─server-out.log # Koa项目输出日志
  ├─server/ # Koa后端代码
  │  ├─controllers/ # 逻辑层
  │  │  ├─questionBank.js # 题库信息
  │  │  ├─subject.js  # 题目信息
  │  │  └─userInfo.js # 用户信息
  │  ├─app.js # Koa入口文件
  │  └─controller.js  # Koa控制层捕获文件
  ├─src/  # Vue前端核心代码
  │  ├─commons/ # 通用逻辑代码
  │  │  └─function.js
  │  ├─components/  # 组件
  │  │  ├─Header/ # 导航栏
  │  │  │  ├─Header.vue
  │  │  │  └─index.js
  │  │  ├─Jumbotron/  # 巨幕
  │  │  │  ├─index.js
  │  │  │  └─Jumbotron.vue
  │  │  ├─Login/  # 登录
  │  │  │  ├─index.js
  │  │  │  └─Login.vue
  │  │  ├─Main/ # 主体骨架
  │  │  │  ├─index.js
  │  │  │  └─Main.vue
  │  │  ├─NavRight/ # 右侧导航栏
  │  │  │  ├─index.js
  │  │  │  └─NavRight.vue
  │  │  ├─Subject/  # 题目
  │  │  │  ├─index.js
  │  │  │  └─Subject.vue
  │  │  └─Well/ # 内嵌(暂时没有用到)
  │  │     ├─index.js
  │  │     └─Well.vue
  │  ├─router/  # Vue路由配置
  │  │  └─index.js
  │  ├─store/ # Vuex共享状态信息
  │  │  ├─modules/
  │  │  │  ├─navRight.js  # 右侧导航栏的共享状态信息
  │  │  │  └─questionBank.js # 题库的共享状态信息
  │  │  ├─actions.js  # 公共的actions
  │  │  ├─getters.js  # 公共的getters
  │  │  ├─mutations.js  # 公共的mutations
  │  │  ├─mutation-types.js # 变量命名常量
  │  │  └─index.js  # Vuex的入口文件
  │  ├─App.vue  # Vue主体模板文件
  │  └─main.js  # Vue入口文件
  ├─static/ # 静态资源
  ├─pm2.json  # pm2配置文件
  ······
```