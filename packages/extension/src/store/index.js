import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '../services/UserService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: '',
    },
  },
  mutations: {
    SET_TOKEN(state, user) {
      state.user.token = user.token
    },
  },
  actions: {
    getToken({ commit }, user) {
      return UserService.getToken(user)
        .then(() => {
          commit('SET_TOKEN', user)
        })
        .catch((error) => {
          throw error
        })
    },
    createUser({ commit }, user) {
      return UserService.addUser(user)
        .then(() => {
          commit('SET_TOKEN', user)
        })
        .catch((error) => {
          throw error
        })
    },
  },
  modules: {},
})
