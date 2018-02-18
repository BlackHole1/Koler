import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import problemsWarehouse from './modules/problemsWarehouse'
import navRight from './modules/navRight'
import test from './modules/test'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    problemsWarehouse,
    navRight,
    test
  }
})
