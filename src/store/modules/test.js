import * as types from '../mutation-types'

const state = {
  situation: ''
}

const getters = {
  getSituation: state => {
    return state.situation
  }
}

const actions = {
  create ({commit, state}) {
    commit(types.START_TEST)
  },
  end ({commit, state}) {
    commit(types.END_TEST)
  }
}

const mutations = {
  [types.START_TEST] (state) {
    state.situation = 'start'
    sessionStorage.setItem('Koler-test', 'start')
  },
  [types.END_TEST] (state) {
    state.situation = 'end'
    sessionStorage.setItem('Koler-test', 'end')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

