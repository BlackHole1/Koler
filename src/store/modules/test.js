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
    sessionStorage.setItem('Koler-testList', [])
  },
  [types.END_TEST] (state) {
    state.situation = 'end'
    sessionStorage.setItem('Koler-test', 'end')
    sessionStorage.setItem('Koler-testList', [])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

