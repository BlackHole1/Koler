import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  situation: '',
  list: [],
  data: []
}

const getters = {
  getSituation: state => {
    return state.situation
  },
  getList: state => {
    return state.list
  },
  getData: state => {
    return state.data
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
  },
  data ({commit, state}, cb) {
    new Vue().$http.get('/Api/test').then(resp => {
      let content = resp.data.data
      commit(types.TEST_DATA, content)
      !(cb) ? '' : cb(content)
    })
  }
}

const mutations = {
  [types.START_TEST] (state) {
    state.situation = 'start'
    state.list = []
    sessionStorage.setItem('Koler-test', 'start')
  },
  [types.END_TEST] (state) {
    state.situation = 'end'
    state.list = []
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
  },
  [types.TEST_DATA] (state, content) {
    state.data = content
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

