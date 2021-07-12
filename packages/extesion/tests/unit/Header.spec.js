import Header from '../../src/components/Header'
import { mount } from '@vue/test-utils'
const wrapper = mount(Header)

describe('Header', () => {
  test('If search is shown', () => {
    expect(wrapper.get('#header-icon-search').isVisible()).toBe(true)
  })
  test('If message menu is shown', () => {
    expect(wrapper.get('#header-icon-message').isVisible()).toBe(true)
  }),
    test('If bell menu is shown', () => {
      expect(wrapper.get('#header-icon-bell').isVisible()).toBe(true)
    }),
    test('Profile click', async () => {
      await wrapper.find('#header-profile').trigger('click')
      //expect(wrapper.html()).toContain('modal')
      expect(wrapper.get('#modal-profile').isVisible()).toBe(true)
    })
})
