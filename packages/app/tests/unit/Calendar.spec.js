import { shallowMount } from '@vue/test-utils'
import Calendar from '@/components/Calendar.vue'

describe('Calendar.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Calendar, {
      props: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
