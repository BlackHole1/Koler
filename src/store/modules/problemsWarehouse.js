import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  problemsWarehouse: '' // 题库数据
}

const getters = {
  getDetailsByName: state => (name) => {
    if (state.problemsWarehouse.names.includes(name)) {
      return {
        state: true,
        data: state.problemsWarehouse[name].details
      }
    }
    return {
      state: false,
      data: {}
    }
  },
  getProblemsWarehouseInfo: state => {
    return state.problemsWarehouse
  }
}

const actions = {
  getProblemsWarehouseList ({commit, state}) {
    new Vue().$http.get('/Api/problemsWarehouse')
      .then(resp => {
        let data = resp.data
        if (data.count === 0) {
          commit(types.DATA_PROBLEMSWAREHOUSE, {
            data: null
          })
        } else {
          commit(types.DATA_PROBLEMSWAREHOUSE, {
            data: data
          })
        }
      })
  }
}

const mutations = {
  [types.DATA_PROBLEMSWAREHOUSE] (state, payload) {
    state.problemsWarehouse = payload.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
