import Header from '@/components/init/Header'
import { mount } from '@vue/test-utils'

const data = {
  title: 'Login',
}
const factory = () => {
  return mount(Header, {
    propsData: data,
  })
}
describe('init/Header', () => {
  it('code modal snapshot', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.get('.modal-title').text()).toBe(data.title)
  })
})
