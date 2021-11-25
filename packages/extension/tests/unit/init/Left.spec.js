import Left from '@/components/init/Left'
import { mount } from '@vue/test-utils'

describe('init/Left', () => {
  it('code modal snapshot', () => {
    const wrapper = mount(Left)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
