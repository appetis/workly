import Header from '@/components/Header'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import UserService from '@/services/UserService'
import Vuex from 'vuex'
import { mockUser, mockUserWithAvatar } from '../data'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('@/services/UserService')
beforeEach(() => {
  jest.clearAllMocks()
})

describe('Header', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      getLocalStorageUser: () => ({
        id: 2,
        teams: [{ id: 1 }],
      }),
    }
    store = new Vuex.Store({
      getters,
      state: {
        isGuest: false,
      },
    })
  })

  const factory = () => {
    return shallowMount(Header, { store, localVue })
  }
  /*test('If search is shown', () => {
      expect(wrapper.get('#header-icon-search').isVisible()).toBe(false)
    })
    test('If message menu is shown', () => {
      expect(wrapper.get('#header-icon-message').isVisible()).toBe(true)
    }),
    test('If bell menu is shown', () => {
      expect(wrapper.get('#header-icon-bell').isVisible()).toBe(true)
    }),*/

  describe('User without avatar image', () => {
    it('Call get User and displays status and no image', async () => {
      UserService.getUser.mockResolvedValueOnce({ data: mockUser() })

      const wrapper = factory()
      await flushPromises()

      expect(UserService.getUser).toHaveBeenCalledTimes(1)
      expect(wrapper.find('#modal-profile').isVisible()).toBe(false)
      // expect(wrapper.find('#header-no-profile').isVisible()).toBe(true)
    })

    /*    it('Profile with no avatar click', async () => {
      UserService.getUser.mockResolvedValueOnce({ data: mockUser() })
      const wrapper = factory()
      await flushPromises()

       await wrapper.find('#header-avatar').trigger('click')
      //expect(wrapper.html()).toContain('modal')
      expect(wrapper.get('#modal-profile').isVisible()).toBe(true)
    })*/
  })
  describe('User with avatar image', () => {
    it('Call get User and displays status and avatar', async () => {
      UserService.getUser.mockResolvedValueOnce({ data: mockUserWithAvatar() })

      const wrapper = factory()
      await flushPromises()

      expect(UserService.getUser).toHaveBeenCalledTimes(1)
      // expect(wrapper.find('#header-profile').isVisible()).toBe(true)
      // expect(wrapper.find('#header-no-profile').isVisible()).toBe(false)
    })

    /*    it('Profile with avatar click', async () => {
      UserService.getUser.mockResolvedValueOnce({ data: mockUserWithAvatar() })
      const wrapper = factory()
      await flushPromises()

      await wrapper.find('#header-avatar').trigger('click')
      expect(wrapper.get('#modal-profile').isVisible()).toBe(true)
    })*/
  })
})
