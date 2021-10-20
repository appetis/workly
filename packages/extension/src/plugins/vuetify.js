import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'

import 'vuetify/dist/vuetify.min.css'

import '@/assets/css/tailwind.css'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#042F31',
        secondary: '#EEEEEE',
        accent: '#042F31',
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
}

export default new Vuetify(opts)
