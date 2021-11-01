<template>
  <div class="w-full h-screen">
    <Page v-show="!$store.state.ready" ref="initPage" />

    <div class="brand table" v-show="$store.state.ready">
      <LeftMenu class="table-cell align-top" />

      <div class="h-screen w-full table-cell">
        <Header ref="topHeader" />
        <v-app class="home">
          <router-view class="w-full" />
        </v-app>
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
    this.$store.dispatch('setInit', this.user)

    const thisInstance = this
    this.$root.$on('getProfileInfo', function () {
      //thisInstance.incrementCount()
      thisInstance.$refs.topHeader.getInfo()
    })

    this.$root.$on('resetPage', function () {
      thisInstance.$refs.initPage.goSignin()
    })

    this.$root.$on('openCalendar', function () {
      thisInstance.$refs.initPage.openCalendar()
    })
  },
  watch: {},
  methods: {},
}
</script>
