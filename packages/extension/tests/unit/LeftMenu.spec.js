import LeftMenu from '@/components/LeftMenu'
import App from '@/App'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import Home from '@/views/Home'
import User from '@/views/User'
import Link from '@/views/Link'
import Setting from '@/views/Setting'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import UserService from '@/services/UserService'
import { mockUser } from '../data'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

jest.mock('@/services/UserService')
jest.mock('@/services/TeamService')

let store
let actions
let getters
let vuetify

beforeEach(() => {
  jest.clearAllMocks()
  //jest.mockReturnValue(Promise.resolve({}));

  actions = {
    setInit: jest.fn(),
    setLoading: jest.fn(),
  }

  getters = {
    getLocalStorageUser: () => ({
      id: 2,
      teams: [{ id: 1 }],
    }),
    getTeams: () => [],
    getTeamsCount: () => 0,
  }
  store = new Vuex.Store({
    state: {
      user: {
        id: 2,
        teams: [{ id: 1 }],
      },
      ready: true,
      isGuest: false,
    },
    getters,
    actions,
  })
  vuetify = new Vuetify()
})
const router = new VueRouter({ routes })

const shallowFactory = (className) => {
  return shallowMount(className, { store, localVue, vuetify, router })
}
const factory = (className) => {
  return mount(className, { store, localVue, vuetify, router })
}

const fnMockUser = async (className) => {
  UserService.getUser.mockResolvedValueOnce({ data: mockUser() })
  const wrapper = factory(className)
  await flushPromises()
  return wrapper
}

describe('LeftMenu', () => {
  describe('Menu icons', () => {
    it('If calendar menu is shown', () => {
      const leftWrapper = shallowFactory(LeftMenu)
      expect(leftWrapper.get('#menu-icon-calendar').isVisible()).toBe(true)
    })
    it('If user menu is shown', () => {
      const leftWrapper = shallowFactory(LeftMenu)
      expect(leftWrapper.get('#menu-icon-user').isVisible()).toBe(true)
    }),
      it('If link menu is shown', () => {
        const leftWrapper = shallowFactory(LeftMenu)
        expect(leftWrapper.get('#menu-icon-link').isVisible()).toBe(true)
      }),
      it('If setting menu is shown', () => {
        const leftWrapper = shallowFactory(LeftMenu)
        expect(leftWrapper.get('#menu-icon-setting').isVisible()).toBe(true)
      })
  })

  describe('Routing', () => {
    it('renders a child component via routing /', async () => {
      const wrapper = await fnMockUser(App)
      router.push('/').catch(() => {})
      await wrapper.vm.$nextTick()

      expect(UserService.getUser).toHaveBeenCalledTimes(1)
      expect(wrapper.findComponent(Home).exists()).toBe(true)
    })
    it('renders a child component via routing /user', async () => {
      const wrapper = await fnMockUser(App)
      router.push('/user')
      await wrapper.vm.$nextTick()

      expect(UserService.getUser).toHaveBeenCalledTimes(1)
      expect(wrapper.findComponent(User).exists()).toBe(true)
    })
    it('renders a child component via routing /link', async () => {
      const wrapper = await fnMockUser(App)
      router.push('/link')
      await wrapper.vm.$nextTick()

      expect(UserService.getUser).toHaveBeenCalledTimes(1)
      expect(wrapper.findComponent(Link).exists()).toBe(true)
    })

    it('renders a child component via routing /setting', async () => {
      const wrapper = await fnMockUser(App)
      router.push('/setting')
      await wrapper.vm.$nextTick()

      expect(UserService.getUser).toHaveBeenCalledTimes(1)
      expect(wrapper.findComponent(Setting).exists()).toBe(true)
    })
  })
})
