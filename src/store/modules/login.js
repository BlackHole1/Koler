import * as types from '../mutation-types'

const state = {
  token: ''
}

const getters = {
  getToken: state => {
    return sessionStorage.getItem('Koler-token')
  }
}

const actions = {
  addToken ({commit, state}, token) {
    commit(types.ADD_TOKEN, token)
  },
  delToken ({commit, state}) {
    commit(types.DEL_TOKEN)
  }
}

const mutations = {
  [types.ADD_TOKEN] (state, token) {  // 添加token
    state.token = token
    sessionStorage.setItem('Koler-token', token)
  },
  [types.DEL_TOKEN] (state) { // 删除token
    state.token = ''
    sessionStorage.setItem('Koler-token', '')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
