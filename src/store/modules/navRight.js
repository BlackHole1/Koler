import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  /* 右侧边栏的模式，不同模式显示不同的数据。
      userInfo => 主页默认数据（用户头像、名称、当前身份、上一级管理者的身份及名字）
      subject => 题库数据（共有多少题、类型导航、）
      exam => 考试数据（完成多少题、有多少题没有完成、还剩多少时间）
 */
  model: '',
  // 存放各模式的数据信息
  userInfoData: '',
  subjectData: '',
  examData: ''
}

const getters = {
  getModel: state => {
    return state.model
  },
  getUserInfo: state => {
    return state.userInfoData
  },
  getSubject: state => {
    return state.subjectData
  },
  getExam: state => {
    return state.examData
  }
}

const actions = {
  getInfoBymodel ({commit, state}, data) {
    const url = (data.subjectName === '')
    ? `http://localhost:5020/Api/${data.model}`
    : `http://localhost:5020/Api/${data.model}/${data.subjectName}`
    axios.get(url).then(resp => {
      let content = resp.data
      commit(types.DATA_NAVMODEL, {
        data: data.model
      })
      commit(types.DATA_NAVRIGHTMODEL, {
        model: data.model + 'Data',
        data: content
      })
    }).catch(error => {
      console.log(error)
    })
  }
}

const mutations = {
  [types.DATA_NAVMODEL] (state, payload) {  // 修改当前模式
    state.model = payload.data
  },
  [types.DATA_NAVRIGHTMODEL] (state, payload) { // 给相应的模式放入数据
    state[payload.model] = payload.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
