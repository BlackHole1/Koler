import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  /* 右侧边栏的模式，不同模式显示不同的数据。
      user => 主页默认数据（用户头像、名称、当前身份、上一级管理者的身份及名字）
      subject => 题库数据（共有多少题、类型导航）
      test => 试卷数据(共有多少题)
      exam => 考试数据（完成多少题、有多少题没有完成、还剩多少时间）
 */
  model: '',
  // 存放各模式的数据信息
  userData: {
    avatar_url: '',
    created_date: '',
    email: '',
    name: '',
    type: '',
    upper: '',
    upper_name: ''
  },
  subjectData: {
    count: ''
  },
  testData: {
    count: ''
  },
  examData: ''
}

const getters = {
  getModel: state => {
    return state.model
  },
  getUser: state => {
    return state.userData
  },
  getSubject: state => {
    return state.subjectData
  },
  getTest: state => {
    return state.testData
  },
  getExam: state => {
    return state.examData
  }
}

const actions = {
  getInfoBymodel ({commit, state}, data) {
    const setState = (content) => {
      commit(types.DATA_NAVMODEL, {
        data: data.model
      })
      commit(types.DATA_NAVRIGHTMODEL, {
        model: data.model + 'Data',
        data: content
      })
    }

    const setCount = (content, model) => {
      content.count = model.details.length // 共多少道题目
    }

    let content = {}
    if (data.model === 'user') {
      new Vue().$http.get('/Api/user').then(resp => {
        content = resp.data
        setState(content)
      })
    } else if (data.model === 'subject') {
      const subjectInfo = this.getters['problemsWarehouse/getProblemsWarehouseInfo'][data.subjectName] // 当前题目的详细信息
      if (subjectInfo || subjectInfo !== undefined) {
        setCount(content, subjectInfo)
        setState(content)
      } else {
        this.dispatch('problemsWarehouse/getProblemsWarehouseList', () => {
          if (subjectInfo === undefined) {
            content = {}
          } else {
            setCount(content, subjectInfo)
          }
          setState(content)
        })
      }
    } else if (data.model === 'test') {
      let content = {}
      const testInfo = this.getters['test/getData']
      if (testInfo.length !== 0) {
        testInfo.some((test, index) => {
          if (test.name === data.testName) {
            setCount(content, testInfo[index])
            setState(content)
          }
        })
      } else {
        this.dispatch('test/data', () => {
          const testInfo = this.getters['test/getData']
          testInfo.some((test, index) => {
            if (test.name === data.testName) {
              setCount(content, testInfo[index])
              setState(content)
            }
          })
        })
      }
    }
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
