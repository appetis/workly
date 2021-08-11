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
  methods: {
    // getImgUrl(pet) {
    //   var images = require.context('../assets/images/', false, /\.png$/)
    //   return images('./' + pet + ".png")
    // }
  },
}
</script>
