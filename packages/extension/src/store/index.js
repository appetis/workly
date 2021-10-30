import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '../services/UserService'
import LocalStorageService from '../services/LocalStorageService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      tokens: {},
      teams: [],
    },
    ready: false,
    isGuest: false,
    loading: false,
  },
  mutations: {
    SET_USER(state, data) {
      //console.log('SET_USER ===>', data.user, data)
      state.user.id = data.user.id
      let user = {
        id: data.user.id,
        teams: [],
      }
      if (data.accessToken) {
        const tokens = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }
        //state.user.tokens = tokens
        LocalStorageService.setData('tokens', tokens)
        //localStorage.removeItem('isGuest')
        LocalStorageService.clearData('isGuest')
        state.isGuest = false
        state.user.teams = user.teams = data.user.Teams
        //localStorage.setItem('user', JSON.stringify(user))
        LocalStorageService.setData('user', user)
      }
      //state.ready = true
    },
    SET_READY(state) {
      state.ready = true
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_INIT(state) {
      const user = LocalStorageService.getData('user')
      if (user || localStorage.isGuest) {
        state.ready = true
        state.user = user
        //state.user.tokens = tokens
      }

      if (localStorage.isGuest) state.isGuest = true
      var events = [
        { id: 1, value: 'hello' },
        { id: 2, value: 'hello2' },
        { id: 3, value: 'hello3' },
      ]

      // set array to LocalStorage
      LocalStorageService.setData('events', events)

      // get array from LocalStorage
      console.log(LocalStorageService.getData('events') || '[]')
    },
    RESET_USER(state) {
      LocalStorageService.clearData('tokens')
      LocalStorageService.clearData('user')
      state.user = {
        id: 0,
        tokens: {},
        teams: [],
      }
      state.ready = false
      state.isGuest = false
    },
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
    logout({ commit }) {
      const data = {
        refreshToken: LocalStorageService.getData('tokens').refreshToken,
      }
      return UserService.logout(data)
        .then((response) => {
          commit('RESET_USER')
          return response
        })
        .catch((error) => {
          throw error
        })
    },
    verifyCode({ commit }, data) {
      return UserService.verify(data.id, data.req)
        .then((response) => {
          //console.log('VERIFY --->', response)
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
    setInit({ commit }) {
      commit('SET_INIT')
    },
  },
  modules: {},
})
