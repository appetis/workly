import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '../services/UserService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      tokens: {},
      teams: []
    },
    ready: false,
    isGuest: false,
    loading: false
  },
  mutations: {
    SET_USER(state, data) {
      console.log('SET_USER ===>', data.user, data.token)
      state.user.id = data.user.id
      let user = {
        id: data.user.id,
        teams: [],
      }
      if (data.accessToken) {
        state.user.tokens.accessToken = data.accessToken
        state.user.tokens.refreshToken = data.refreshToken
        localStorage.setItem('tokens', JSON.stringify(state.user.tokens))
        localStorage.removeItem('isGuest')
        state.isGuest = false
        state.user.teams = user.teams = data.user.Teams
        localStorage.setItem('user', JSON.stringify(user))
      }
      //state.ready = true
    },
    SET_READY(state) {
      state.ready = true
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    login({ commit }, user) {
      return UserService.login(user)
        .then((response) => {
          commit('SET_USER', response.data)
          if (response.data.user.status === 'VE') commit('SET_READY')

          return response
        })
        .catch((error) => {
          throw error
        })
    },
    verifyCode({ commit }, data) {
      return UserService.verify(data.id, data.req)
        .then((response) => {
          console.log('VERIFY --->', response)
          commit('SET_USER', response.data)
          if (response.data.user.status === 'VE') commit('SET_READY')
        })
        .catch((error) => {
          throw error
        })
    },
    createUser({ commit }, user) {
      return UserService.addUser(user)
        .then((response) => {
          const data = {
            user: response.data,
          }
          commit('SET_USER', data)
        })
        .catch((error) => {
          throw error
        })
    },
    joinTeamByCode({ commit }, code) {
      return UserService.verify(code)
        .then((response) => {
          commit('SET_USER', response.data)
        })
        .catch((error) => {
          throw error
        })
    },
  },
  modules: {},
})
