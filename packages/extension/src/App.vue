<template>
  <div class="w-full h-screen">
    <Page v-show="!$store.state.ready" />

    <div class="brand table" v-show="$store.state.ready">
      <LeftMenu class="table-cell align-top" />

      <div class="h-screen w-full bg-brand-lightgray table-cell">
        <Header />
        <router-view class="w-full" />
      </div>
    </div>
  </div>
</template>
<script>
import Page from '@/components/init/Page'
import LeftMenu from '@/components/LeftMenu'
import Header from '@/components/Header'

export default {
  components: {
    Page,
    LeftMenu,
    Header,
  },
  mounted() {
    if (localStorage.token) {
      this.$store.state.ready = true
      this.$store.state.user.token = localStorage.token
    }

    var events = [
      { id: 1, value: 'hello' },
      { id: 2, value: 'hello2' },
      { id: 3, value: 'hello3' },
    ]

    // set array to LocalStorage
    localStorage.setItem('events', JSON.stringify(events))

    // get array from LocalStorage
    console.log(JSON.parse(localStorage.getItem('events') || '[]'))
  },
  watch: {},
  methods: {
    // getImgUrl(pet) {
    //   var images = require.context('../assets/images/', false, /\.png$/)
    //   return images('./' + pet + ".png")
    // }
  },
}
</script>
