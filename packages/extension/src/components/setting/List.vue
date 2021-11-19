<template>
  <div>
    <Loading :isLoading="isLoading" />
    <p>Setting List</p>

    <div class="ml-4 font-bold cursor-pointer" @click="logout()">Logout</div>
  </div>
</template>

<script>
import Loading from '../loading/Loading'
export default {
  name: 'Setting',
  // mounted() {
  //   browser.runtime.sendMessage({});
  // },
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {},
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      console.log('Setting page init')

      this.$store.dispatch('setLoading', false)
    },
    logout() {
      this.$root.$emit('getStatusStop')
      this.$store.dispatch('setLoading', true)
      this.$store
        .dispatch('logout')
        .then((response) => {
          console.log('logout --->', response)
          this.$root.$emit('resetPage')
          this.$store.dispatch('setLoading', false)
        })
        .catch((error) => {
          this.showAuthenticationFailMessage = error.response.data.message
          this.isLoading = false
          this.$store.dispatch('setLoading', false)
        })
    },
  },
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
