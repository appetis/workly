import Code from '@/components/init/Code'
import { mount } from '@vue/test-utils'

describe('init/Code', () => {
  it('code modal snapshot', () => {
    const wrapper = mount(Code)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('click continue button', async () => {
    const wrapper = mount(Code)
    const mockOnSubmit = jest.spyOn(wrapper.vm, 'onSubmit')
    await wrapper.find('form').trigger('submit')
    //await wrapper.find('#btn-code-continue').trigger('click')

    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('click Register text', () => {
    const wrapper = mount(Code)
    const mockGoSignup = jest.fn()
    wrapper.vm.$on('goSignup', mockGoSignup)
    //const mockGoSignup = jest.spyOn(wrapper.vm, 'goSignup')
    wrapper.find('#text-register').trigger('click')

    expect(mockGoSignup).toHaveBeenCalledTimes(1)
  })

  it('click Login text', () => {
    const wrapper = mount(Code)
    const mockGoSignin = jest.fn()
    wrapper.vm.$on('goSignin', mockGoSignin)
    //const mockGoSigin = jest.spyOn(wrapper.vm, 'goSignup')
    wrapper.find('#text-login').trigger('click')

    expect(mockGoSignin).toHaveBeenCalledTimes(1)
  })
})
