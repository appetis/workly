import Init from '@/components/init/Init'
import { mount } from '@vue/test-utils'

const factory = () => {
  const wrapper = mount(Init)
  return wrapper
}

describe('init/Init', () => {
  it('init modal snapshot', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("doesn't have an invite code", () => {
    const wrapper = factory()
    const mockGoSignup = jest.fn()
    wrapper.vm.$on('goSignup', mockGoSignup)
    wrapper.find('#btn-no').trigger('click')

    expect(mockGoSignup).toHaveBeenCalledTimes(1)
  })

  it('has an invite code', () => {
    const wrapper = factory()
    const mockGoCode = jest.fn()
    wrapper.vm.$on('goHasCode', mockGoCode)
    wrapper.find('#btn-yes').trigger('click')

    expect(mockGoCode).toHaveBeenCalledTimes(1)
  })
})
