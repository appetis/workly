<template>
  <div>
    <Loading :isLoading="isLoading" />
    <p>Link List</p>
  </div>
</template>

<script>
import Loading from '../loading/Loading'
export default {
  name: 'Link',
  // mounted() {
  //   browser.runtime.sendMessage({});
  // },
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {},
  components: {
    Loading,
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      console.log('Link page init')
      window.setTimeout(() => {
        this.$store.dispatch('setLoading', false)
      }, 3000)
    },
  },
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
