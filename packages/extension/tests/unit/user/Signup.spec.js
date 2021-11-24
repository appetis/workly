import Signup from '@/components/user/Signup'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  jest.clearAllMocks()

  store = new Vuex.Store({
    state: {
      isGuest: false,
    },
  })
})

const factory = () => {
  return mount(Signup, { store, localVue })
}

describe('init/Signup', () => {
  it('signup modal snapshot', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('if email or password is empty for blur events', async () => {
    const wrapper = factory()
    await wrapper.setData({
      user: {
        email: '',
        password: '',
      },
    })
    await wrapper.find('#email').trigger('blur')
    expect(wrapper.find('#message-required-email').text()).toBe(
      'Email address is required'
    )

    await wrapper.find('#password').trigger('blur')
    expect(wrapper.find('#message-required-password').text()).toBe(
      'Password is required'
    )
  })

  it('if email or password is incorrect for blur events', async () => {
    const wrapper = factory()
    await wrapper.setData({
      user: {
        email: 'aaaa',
        password: 'bbbb',
      },
    })
    await wrapper.find('#email').trigger('blur')
    expect(wrapper.find('#message-required-email').text()).toBe(
      'The email address is not correct.'
    )

    await wrapper.find('#password').trigger('blur')
    expect(wrapper.find('#message-required-password').text()).toBe(
      'Minimum 8 characters required'
    )
  })

  it('if email or password is empty for submit event', async () => {
    const wrapper = factory()
    await wrapper.setData({
      user: {
        email: '',
        password: '',
      },
    })
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('#message-required-email').text()).toBe(
      'Email address is required'
    )
    expect(wrapper.find('#message-required-password').text()).toBe(
      'Password is required'
    )
  })

  it('if email or password is incorrect for submit event', async () => {
    const wrapper = factory()
    await wrapper.setData({
      user: {
        email: 'aaaa',
        password: 'bbbb',
      },
    })
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('#message-required-email').text()).toBe(
      'The email address is not correct.'
    )
    expect(wrapper.find('#message-required-password').text()).toBe(
      'Minimum 8 characters required'
    )
  })

  it('click text of show and hide password', async () => {
    const wrapper = factory()

    expect(wrapper.get('#show-plain-password').isVisible()).toBe(true)
    expect(wrapper.get('#hide-plain-password').isVisible()).toBe(false)

    await wrapper.find('#show-plain-password').trigger('click')
    expect(wrapper.get('#hide-plain-password').isVisible()).toBe(true)

    await wrapper.find('#hide-plain-password').trigger('click')
    expect(wrapper.get('#show-plain-password').isVisible()).toBe(true)
  })

  it('click Sign up button', async () => {
    const wrapper = factory()
    const mockOnSubmit = jest.spyOn(wrapper.vm, 'onSubmit')
    await wrapper.find('form').trigger('submit')
    //await wrapper.find('#btn-code-continue').trigger('click')

    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('click Login text', () => {
    const wrapper = factory()
    const mockGoSignin = jest.fn()
    wrapper.vm.$on('goSignin', mockGoSignin)
    wrapper.find('#text-login').trigger('click')

    expect(mockGoSignin).toHaveBeenCalledTimes(1)
  })

  it("click 'Continue as a guest' button", () => {
    const wrapper = factory()
    const mockAsGuest = jest.fn()
    wrapper.vm.$on('goAsGuest', mockAsGuest)
    wrapper.find('#btn-quest').trigger('click')

    expect(mockAsGuest).toHaveBeenCalledTimes(1)
  })
  it("click 'Continue with a code' button", () => {
    const wrapper = factory()
    const mockGoHasCode = jest.fn()
    wrapper.vm.$on('goHasCode', mockGoHasCode)
    wrapper.find('#btn-code').trigger('click')

    expect(mockGoHasCode).toHaveBeenCalledTimes(1)
  })
})
