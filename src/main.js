// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './commons/axios'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  watch: {
    '$route': 'checkLogin'
  },
  methods: {
    checkLogin () {
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('Koler-token')
      this.$http.defaults.headers.common['Accept'] = 'application/json'
      let currentRouter = this.$router.history.current.name
      if (currentRouter === 'Login') {
        this.sendCheckLoginResp().then(() => {
          this.$message.success(`您已成功登录，无需多次登录`)
          this.$router.push('/')
        }).catch((resp) => {
          this.$http.defaults.headers.common['Authorization'] = ''
          this.$store.dispatch('delToken')
        })
      } else {
        this.sendCheckLoginResp().then(() => {
          // 无操作
        }).catch((resp) => {
          this.$message.warning(`${resp.data.data}！请重新登录`)
          this.$http.defaults.headers.common['Authorization'] = ''
          this.$store.dispatch('delToken')
          this.$router.push('/Login')
        })
      }
    },
    sendCheckLoginResp () {
      return this.$http.get('testLogin')
      .then(resp => {
        if (resp.data.state === false && resp.data.category === 'jwt') {
          return Promise.reject(resp)
        }
        return Promise.resolve()
      })
    }
  }
})
