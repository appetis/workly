import LeftMenu from '../../src/components/LeftMenu'
import App from '../../src/App'
import { mount, flushPromises } from '@vue/test-utils'
import router from '../../src/router'
import VueFeather from 'vue-feather'

const wrapper = mount(LeftMenu, {
  global: {
    plugins: [router],
    components: { VueFeather },
  },
})
const appWrapper = mount(App, {
  global: {
    plugins: [router],
    components: { VueFeather },
  },
})

describe('LeftMenu', () => {
  test('If calendar menu is shown', () => {
    expect(wrapper.get('#menu-icon-calendar').isVisible()).toBe(true)
  }),
    test('If user menu is shown', () => {
      expect(wrapper.get('#menu-icon-user').isVisible()).toBe(true)
    }),
    test('If link menu is shown', () => {
      expect(wrapper.get('#menu-icon-link').isVisible()).toBe(true)
    }),
    test('If setting menu is shown', () => {
      expect(wrapper.get('#menu-icon-setting').isVisible()).toBe(true)
    }),
    test('routing / ', async () => {
      router.push('/')
      await router.isReady()

      await wrapper.find('#menu-icon-calendar').trigger('click')
      await flushPromises()
      expect(appWrapper.html()).toContain('Calendar page')
    }),
    test('routing /user', async () => {
      router.push('/user')
      await router.isReady()

      await wrapper.find('#menu-icon-user').trigger('click')
      await flushPromises()
      expect(appWrapper.html()).toContain('This is an user page')
    }),
    test('routing /link', async () => {
      router.push('/link')
      await router.isReady()

      await wrapper.find('#menu-icon-link').trigger('click')
      await flushPromises()
      expect(appWrapper.html()).toContain('This is an link page')
    }),
    test('routing /setting', async () => {
      router.push('/setting')
      await router.isReady()

      await wrapper.find('#menu-icon-setting').trigger('click')
      await flushPromises()
      expect(appWrapper.html()).toContain('This is an setting page')
    })
})
