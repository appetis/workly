import Profile from '@/components/user/Profile'
import { mount } from '@vue/test-utils'
import { mockUser } from '../../data'

const factory = () => {
  return mount(Profile, {
    propsData: {
      profile: mockUser().user,
    },
  })
}

describe('init/Profile', () => {
  it('profile modal snapshot', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('display profile data', () => {
    const wrapper = factory()
    const user = mockUser().user

    expect(wrapper.find('#profile-name').text()).toBe(user.Profile.name)
    expect(wrapper.find('.profile-position').text()).toBe(user.Profile.position)
    expect(wrapper.find('#profile-department').text()).toBe(
      user.Profile.department
    )
    expect(wrapper.find('#profile-email').text()).toBe(user.email)
    expect(wrapper.find('#profile-phone-ext').text()).toBe(
      user.Profile.phone_ext
    )
    expect(wrapper.find('#profile-phone').text()).toBe(user.Profile.phone)
  })

  it('click close button', () => {
    const wrapper = factory()
    const mockClose = jest.fn()
    wrapper.vm.$on('close', mockClose)
    wrapper.find('.modal-close').trigger('click')

    expect(mockClose).toHaveBeenCalledTimes(1)
  })
})
