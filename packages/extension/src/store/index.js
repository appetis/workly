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
    loading: true,
  },
  mutations: {
    SET_USER(state, data) {
      //console.log('SET_USER ===>', data.user, data)
      console.log('1 SET_USER ==== > start ')
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
        console.log(
          '2 user set data === ',
          JSON.parse(localStorage.getItem('user'))
        )
      }
      //state.ready = true
      console.log('1 SET_USER ==== > end ')
    },
    SET_READY(state) {
      state.ready = true
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_INIT(state) {
      const user = LocalStorageService.getData('user')
      if (user || LocalStorageService.getData('isGuest')) {
        state.ready = true
        state.user = user
        //state.user.tokens = tokens
      }
      if (LocalStorageService.getData('isGuest')) state.isGuest = true

      console.log(
        'is Guest === >',
        LocalStorageService.getData('isGuest'),
        state.isGuest
      )
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
    async login({ commit }, user) {
      return await UserService.login(user)
        .then((response) => {
          commit('SET_USER', response.data)
          if (response.data.user.status === 'VE') commit('SET_READY')

          return response
        })
        .catch((error) => {
          throw error
        })
    },
    async logout({ commit }) {
      const data = {
        refreshToken: LocalStorageService.getData('tokens').refreshToken,
      }
      return await UserService.logout(data)
        .then((response) => {
          commit('RESET_USER')
          return response
        })
        .catch((error) => {
          throw error
        })
    },
    async verifyCode({ commit }, data) {
      return await UserService.verify(data.id, data.req)
        .then((response) => {
          //console.log('VERIFY --->', response)
          commit('SET_USER', response.data)
          if (response.data.user.status === 'VE') commit('SET_READY')
        })
        .catch((error) => {
          throw error
        })
    },
    async createUser({ commit }, user) {
      return await UserService.addUser(user)
        .then((response) => {
          commit('SET_USER', response.data)
        })
        .catch((error) => {
          throw error
        })
    },
    async joinTeamByCode({ commit }, code) {
      return await UserService.verify(code)
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
    setLoading({ commit }, isLoading) {
      commit('SET_LOADING', isLoading)
    },
  },
  getters: {
    getLocalStorageUser: (state) => {
      return state.user
    },
    getTeams: () => {
      //return state.user.teams
      return LocalStorageService.getData('user').teams
    },
    getTeamsCount: (state, getters) => {
      return getters.getTeams.length
    },
  },
  modules: {},
})
