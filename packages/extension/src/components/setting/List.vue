<template>
  <div>
    <p>Setting List</p>

    <div class="ml-4 font-bold cursor-pointer" @click="logout()">Logout</div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  // mounted() {
  //   browser.runtime.sendMessage({});
  // },
  computed: {},
  methods: {
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
