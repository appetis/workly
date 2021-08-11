import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '../services/UserService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: '',
    },
    ready: false,
  },
  mutations: {
    SET_TOKEN(state, user) {
      state.user.token = user.token
      state.ready = true
    },
  },
  actions: {
    getToken({ commit }, user) {
      return UserService.getToken(user)
        .then((response) => {
          console.log('response ====>', response)
          user.token = response.data.token
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
