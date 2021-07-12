<template>
  <div>
    <p>User List</p>
  </div>
</template>

<script>
export default {
  name: 'User',
  // mounted() {
  //   browser.runtime.sendMessage({});
  // },
  computed: {
    defaultText() {
      return browser.i18n.getMessage('extName')
    },
  },
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
