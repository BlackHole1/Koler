# Koler

> Framework explain document

[**中文架构说明**](https://github.com/BlackHole1/Koler/blob/master/FrameworkDoc-CN.md)

## Directory description

```bash
Koler
  ······
  ├─logs/   # pm2 logs Directory
  │  ├─app-err.log  # Vue project error log
  │  ├─app-out.log  # Vue project output log
  │  ├─README.md
  │  ├─server-err.log # Koa project error log
  │  └─server-out.log # Koa project error log
  ├─server/ # Koa back-end source
  │  ├─controllers/ # Controllers
  │  │  ├─questionBank.js # Question-bank info
  │  │  ├─subject.js  # Subject info
  │  │  └─userInfo.js # User info
  │  ├─app.js # Koa entry file
  │  └─controller.js  # Koa controller catch file
  ├─src/  # Vue front-end core code
  │  ├─commons/ # General logical code
  │  │  └─function.js
  │  ├─components/  # Components
  │  │  ├─Header/ # Navigation
  │  │  │  ├─Header.vue
  │  │  │  └─index.js
  │  │  ├─Jumbotron/  # Jumbotron
  │  │  │  ├─index.js
  │  │  │  └─Jumbotron.vue
  │  │  ├─Login/  # Login
  │  │  │  ├─index.js
  │  │  │  └─Login.vue
  │  │  ├─Main/ # Main frame
  │  │  │  ├─index.js
  │  │  │  └─Main.vue
  │  │  ├─NavRight/ # Right navigation
  │  │  │  ├─index.js
  │  │  │  └─NavRight.vue
  │  │  ├─Subject/  # Subject
  │  │  │  ├─index.js
  │  │  │  └─Subject.vue
  │  │  └─Well/ # Embedded(Temporarily not used)
  │  │     ├─index.js
  │  │     └─Well.vue
  │  ├─router/  # Vue routes configure
  │  │  └─index.js
  │  ├─store/ # Vuex shared state info
  │  │  ├─modules/
  │  │  │  ├─navRight.js  # Right-navigation's shared state info
  │  │  │  └─questionBank.js # question-bank's shared state info
  │  │  ├─actions.js  # common actions
  │  │  ├─getters.js  # common getters
  │  │  ├─mutations.js  # common mutations
  │  │  ├─mutation-types.js # Variable naming constant
  │  │  └─index.js  # Vuex entry file
  │  ├─App.vue  # Vue body template file
  │  └─main.js  # Vue entry file
  ├─static/ # Static resources
  ├─pm2.json  # pm2 configure file
  ······
```