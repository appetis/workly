import List from '@/components/user/List'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import TeamService from '@/services/TeamService'
import Vuex from 'vuex'
import { mockTeams } from '../../data'

jest.mock('@/services/TeamService')
const localVue = createLocalVue()

localVue.use(Vuex)

let getters
let actions
let store
let vuetify

beforeEach(() => {
  jest.clearAllMocks()

  getters = {
    getTeams: () => [{ id: 1 }],
    getTeamsCount: () => 1,
  }
  actions = {
    setLoading: jest.fn(),
  }
  store = new Vuex.Store({
    getters,
    actions,
  })

  vuetify = new Vuetify()
})
const factory = async () => {
  TeamService.getTeams.mockResolvedValueOnce({ data: mockTeams() })
  const wrapper = mount(List, { store, localVue, vuetify })
  await flushPromises()
  return wrapper
}
describe('user/List.vue', () => {
  document.body.setAttribute('data-app', true)

  it('Calls getTeams and displays teams', async () => {
    //getTeam.mockResolvedValueOnce({ "user": mockTeams() })
    const wrapper = await factory()
    await wrapper.vm.$nextTick()
    expect(TeamService.getTeams).toHaveBeenCalledTimes(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Click add Member button and click save button', async () => {
    const wrapper = await factory()

    //const event = jest.fn()

    // wrapper.vm.$on('action-btn:clicked', event)
    // expect(event).toHaveBeenCalledTimes(0)

    // await wrapper.find('.btn-add-member').trigger('click')
    // expect(wrapper.find('.v-card').isVisible()).toBe(true)
    // expect(event).toHaveBeenCalledTimes(1)

    //const wrapper = mount(List, { store, localVue, vuetify })

    await wrapper.find('.btn-add-member').trigger('click')
    expect(wrapper.find('#modal-add-member').isVisible()).toBe(true)
    expect(wrapper.find('#btn-save-member').isVisible()).toBe(true)

    await wrapper.find('#btn-save-member').trigger('click')
    expect(
      wrapper.findAll('.v-data-table__wrapper table tbody tr').length
    ).toBe(mockTeams().team.members.length + 1)
  })
})
