import * as types from '../mutation-types'

const state = {
  situation: '',
  list: []
}

const getters = {
  getSituation: state => {
    return state.situation
  },
  getList: state => {
    return state.list
  }
}

const actions = {
  create ({commit, state}) {
    commit(types.START_TEST)
  },
  end ({commit, state}) {
    commit(types.END_TEST)
  },
  add ({commit, state}, id) {
    commit(types.ADD_TEST, id)
  },
  del ({commit, state}, id) {
    commit(types.DEL_TEST, id)
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
  },
  [types.ADD_TEST] (state, id) {
    if (id !== undefined) {
      state.list.push(id)
      state.list = [...new Set(state.list)]
    }
  },
  [types.DEL_TEST] (state, id) {
    state.list.map((item, index) => {
      if (item === id) {
        state.list.splice(index, 1)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

