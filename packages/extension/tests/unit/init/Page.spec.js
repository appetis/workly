import Page from '@/components/init/Page'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  jest.clearAllMocks()

  store = new Vuex.Store({
    state: {
      user: {
        id: 2,
        teams: [{ id: 1 }],
      },
      ready: true,
      isGuest: false,
    },
  })
})

describe('init/Page', () => {
  describe('open code modal', () => {
    it('open modal', () => {
      const wrapper = mount(Page, { store, localVue })
      expect(wrapper.find('#modal-signin').isVisible()).toBe(true)
    })
  })
  describe('open signup', () => {
    it('open modal', async () => {
      const wrapper = mount(Page, { store, localVue })
      await wrapper.setData({ showCode: false, showSignup: true })
      expect(wrapper.find('#modal-signup').isVisible()).toBe(true)
    })
  })
  describe('open signin', () => {
    it('open modal', async () => {
      const wrapper = mount(Page, { store, localVue })
      await wrapper.setData({
        showCode: false,
        showSignup: false,
        showSignin: true,
      })
      expect(wrapper.find('#modal-signin').isVisible()).toBe(true)
    })
  })
  describe('open verification =', () => {
    it('open modal', async () => {
      const wrapper = mount(Page, { store, localVue })
      await wrapper.setData({
        showCode: false,
        showSignup: false,
        showSignin: false,
        showVerification: true,
      })
      expect(wrapper.find('#modal-verification').isVisible()).toBe(true)
    })
  })
})
