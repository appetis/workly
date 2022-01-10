<template>
  <div class="w-full h-screen">
    <Page v-show="!$store.state.ready" ref="initPage" />

    <div class="brand table" v-show="$store.state.ready">
      <LeftMenu
        v-if="
          ($store.state.user && $store.state.user.id) || $store.state.isGuest
        "
        class="table-cell align-top"
      />

      <div class="h-screen w-full table-cell">
        <v-app class="home">
          <Header
            v-if="
              ($store.state.user && $store.state.user.id) ||
              $store.state.isGuest
            "
            ref="topHeader"
          />
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
    this.$store.dispatch('setInit')

    const thisInstance = this

    this.$root.$on('getStatusStop', async function () {
      await thisInstance.$refs.topHeader.getStatus(false)
    })
    this.$root.$on('resetPage', function () {
      thisInstance.$refs.initPage.goSignin()
    })

    this.$root.$on('openCalendar', async function () {
      await thisInstance.$refs.topHeader.getInfoData()
      thisInstance.$refs.initPage.openCalendar()
    })
  },
  watch: {},
  methods: {},
  created() {
    //console.log('APP ===>', this.$store.state.ready)
  },
}
</script>
