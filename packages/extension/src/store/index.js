import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '../services/UserService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      token: '',
    },
    ready: false,
  },
  mutations: {
    SET_USER(state, user) {
      console.log('SET_USER ===>', user)
      state.user.id = user.id
      if (user.token) {
        state.user.token = user.token
        localStorage.token = user.token
      }
      //state.ready = true
    },
    SET_READY(state) {
      state.ready = true
    },
  },
  actions: {
    getToken({ commit }, user) {
      return UserService.getToken(user)
        .then((response) => {
          // console.log('response ====>', response)
          // user.token = response.data.token
          commit('SET_USER', response.data)
          if (response.data.verified) commit('SET_READY')
        })
        .catch((error) => {
          throw error
        })
    },
    verifyCode({ commit }, data) {
      return UserService.verify(data.id, data.req)
        .then((response) => {
          commit('SET_USER', response.user)
        })
        .catch((error) => {
          throw error
        })
    },
    createUser({ commit }, user) {
      return UserService.addUser(user)
        .then((response) => {
          commit('SET_USER', response.data)
        })
        .catch((error) => {
          throw error
        })
    },
    joinTeamByCode({ commit }, code) {
      return UserService.verify(code)
        .then((response) => {
          commit('SET_USER', response.user)
        })
        .catch((error) => {
          throw error
        })
    },
  },
  modules: {},
})
