import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 定义变量
  username: ''
}
const mutations = {
  // 设置变量，赋值   处理
  setUserName (state, value) {
    state.username = value
  }
}
const actions = {
  // 异步
  // 调用mutations的方法
  setUserName ({ commit }, value) {
    commit('setUserName', value)
  }
}
const getters = {
  // 返回变量值
  getUserName (state) {
    return state.username + ' '
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
