import LeftMenu from '@/components/LeftMenu'
import App from '@/App'
import { mount, createLocalVue } from '@vue/test-utils'
import router from '@/router'
import Home from '@/views/Home'
import User from '@/views/User'
import Link from '@/views/Link'
import Setting from '@/views/Setting'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

const leftWrapper = mount(LeftMenu, {
  localVue,
  router,
})
const wrapper = mount(App, {
  localVue,
  router,
})

describe('LeftMenu', () => {
  test('If calendar menu is shown', () => {
    expect(leftWrapper.get('#menu-icon-calendar').isVisible()).toBe(true)
  }),
    test('If user menu is shown', () => {
      expect(leftWrapper.get('#menu-icon-user').isVisible()).toBe(true)
    }),
    test('If link menu is shown', () => {
      expect(leftWrapper.get('#menu-icon-link').isVisible()).toBe(true)
    }),
    test('If setting menu is shown', () => {
      expect(leftWrapper.get('#menu-icon-setting').isVisible()).toBe(true)
    }),
    it('renders a child component via routing /', async () => {
      router.push('/')
      await wrapper.vm.$nextTick()

      expect(wrapper.findComponent(Home).exists()).toBe(true)
    }),
    it('renders a child component via routing /user', async () => {
      router.push('/user')
      await wrapper.vm.$nextTick()
      await wrapper.find('#menu-icon-user').trigger('click')

      expect(wrapper.findComponent(User).exists()).toBe(true)
    }),
    it('renders a child component via routing /link', async () => {
      router.push('/link')
      await wrapper.vm.$nextTick()
      await wrapper.find('#menu-icon-link').trigger('click')

      expect(wrapper.findComponent(Link).exists()).toBe(true)
    }),
    it('renders a child component via routing /setting', async () => {
      router.push('/setting')
      await wrapper.vm.$nextTick()
      await wrapper.find('#menu-icon-setting').trigger('click')

      expect(wrapper.findComponent(Setting).exists()).toBe(true)
    })

  //   test('routing / ', async () => {
  //     router.push('/')
  //     await appWrapper.vm.$nextTick()
  //
  //     console.log("===>", appWrapper.findComponent(Home));
  //     expect(appWrapper.findComponent(Home).exists()).toBe(true)
  //     console.log(router.currentRoute)
  //   })
  //   test('routing /user', async () => {
  //     router.push('/user')
  //     await router.isReady()
  //
  //     await wrapper.find('#menu-icon-user').trigger('click')
  //     await flushPromises()
  //     expect(appWrapper.html()).toContain('This is an user page')
  //   }),
  //   test('routing /link', async () => {
  //     router.push('/link')
  //     await router.isReady()
  //
  //     await wrapper.find('#menu-icon-link').trigger('click')
  //     await flushPromises()
  //     expect(appWrapper.html()).toContain('This is an link page')
  //   }),
  //   test('routing /setting', async () => {
  //     router.push('/setting')
  //     await router.isReady()
  //
  //     await wrapper.find('#menu-icon-setting').trigger('click')
  //     await flushPromises()
  //     expect(appWrapper.html()).toContain('This is an setting page')
  //   })
})
