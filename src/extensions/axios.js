import axios from 'axios'
import constants from '../../common/config'

const http = axios.create({
  baseURL: constants.serverAddress
})

export default {
  install (Vue, option) {
    Vue.prototype.$http = http
  }
}