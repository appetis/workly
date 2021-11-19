import Signin from '@/components/user/Signin'
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
  return mount(Signin, { store, localVue })
}

describe('init/Signin', () => {
  it('signin modal snapshot', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('click Login button', async () => {
    const wrapper = factory()
    const mockOnSubmit = jest.spyOn(wrapper.vm, 'onSubmit')
    await wrapper.find('form').trigger('submit')
    //await wrapper.find('#btn-code-continue').trigger('click')

    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('click Register text', () => {
    const wrapper = factory()
    const mockGoSignup = jest.fn()
    wrapper.vm.$on('goSignup', mockGoSignup)
    //const mockGoSignup = jest.spyOn(wrapper.vm, 'goSignup')
    wrapper.find('#text-register').trigger('click')

    expect(mockGoSignup).toHaveBeenCalledTimes(1)
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
