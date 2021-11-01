<template>
  <div>
    <Loading />
    <p>Setting List</p>

    <div class="ml-4 font-bold cursor-pointer" @click="logout()">Logout</div>
  </div>
</template>

<script>
import Loading from "../loading/Loading";
export default {
  name: 'Setting',
  // mounted() {
  //   browser.runtime.sendMessage({});
  // },
  components: {
    Loading
  },
  computed: {},
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      console.log("Setting page init")

      window.setTimeout(() => {
        this.$store.dispatch('setLoading', false)
      }, 3000)
    },
    logout() {
      this.$store
        .dispatch('logout')
        .then((response) => {
          console.log('logout --->', response)
          this.$root.$emit('resetPage')
        })
        .catch((error) => {
          this.showAuthenticationFailMessage = error.response.data.message
          this.isLoading = false
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
