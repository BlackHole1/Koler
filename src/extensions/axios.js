import Axios from 'axios'
import constants from '../../common/config'

const http = Axios.create({
  baseURL: constants.serverAddress
})

// 因为我是把axiox封装成vue插件来使用，这样会导致，this.$http是实例化后的，而不是他本身
// axios维护者说的解决方案是，重新引入axios包，来使用。
// 但是我觉得没有必要。我封装的http方法的原型设置为axios本身就好
// 参考链接：https://forum.vuejs.org/t/axios-all-is-not-a-function-inside-vue-component/15601
/* eslint-disable no-proto */
http.__proto__ = Axios
/* eslint-enable */

export default {
  install (Vue, option) {
    Vue.prototype.$http = http
  }
}
