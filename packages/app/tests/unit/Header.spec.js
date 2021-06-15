import Header from '../../src/components/Header'
import { mount } from '@vue/test-utils'
import VueFeather from 'vue-feather'

const wrapper = mount(Header, {
  global: {
    components: { VueFeather },
  },
})
describe('Header', () => {
  test('If search is shown', () => {
    expect(wrapper.get('#header-icon-search').isVisible()).toBe(true)
  }),
    test('If message menu is shown', () => {
      expect(wrapper.get('#header-icon-message').isVisible()).toBe(true)
    }),
    test('If bell menu is shown', () => {
      expect(wrapper.get('#header-icon-bell').isVisible()).toBe(true)
    })
})
