import Verification from '@/components/user/Verification'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  jest.clearAllMocks()

  store = new Vuex.Store({
    state: {
      user: {
        id: 2,
        teams: [{ id: 1 }],
      },
      isGuest: false,
    },
  })
})

const factory = () => {
  return mount(Verification, { store, localVue })
}

describe('init/Verification', () => {
  it('verification modal snapshot', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('click Verification button', async () => {
    const wrapper = factory()
    const mockOnSubmit = jest.spyOn(wrapper.vm, 'onSubmit')
    await wrapper.find('form').trigger('submit')
    //await wrapper.find('#btn-code-continue').trigger('click')

    expect(mockOnSubmit).toHaveBeenCalled()
  })
})
