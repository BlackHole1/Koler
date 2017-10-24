import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  questionBank: '' // 题库数据
}

const getters = {
  getDetailsByName: state => (name) => {
    if (state.questionBank.names.includes(name)) {
      return {
        state: true,
        data: state.questionBank[name].details
      }
    }
    return {
      state: false,
      data: {}
    }
  },
  getQuestionBankInfo: state => {
    return state.questionBank
  }
}

const actions = {
  getQuestionBankList ({commit, state}) {
    axios.get('http://localhost:5020/Api/questionBank').then(resp => {
      let data = resp.data
      if (data.count === 0) {
        commit(types.DATA_QUESTIONBANK, {
          data: null
        })
      } else {
        commit(types.DATA_QUESTIONBANK, {
          data: data
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

const mutations = {
  [types.DATA_QUESTIONBANK] (state, payload) {
    state.questionBank = payload.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
