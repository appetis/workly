<template>
  <div class="flex brand">
    <LeftMenu />

    <div class="h-screen w-full bg-brand-lightgray">
      <Header />
      <router-view class="w-full" />
    </div>
  </div>
</template>
<script>
import LeftMenu from '@/components/LeftMenu'
import Header from '@/components/Header'

export default {
  components: {
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
