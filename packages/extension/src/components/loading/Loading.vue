<template>
  <div>
    <v-progress-linear v-show="$store.state.loading" slot="progress" color="#4DA5AA" indeterminate></v-progress-linear>
<!--    <CubeShadow v-show="$store.state.loading" class="m-auto mt-4" />-->
  </div>
</template>
<script>
//import { CubeShadow } from 'vue-loading-spinner'

export default {
  computed: {},
  name: 'Loading',
  components: {
  //  CubeShadow
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$store.dispatch('setLoading', true)
    }
  }
}
</script>