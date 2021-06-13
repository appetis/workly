<template>
  <div class="header">
    <div class="header-title">David Health</div>
    <div class="header-menus">
      <vue-feather size="18" type="search" class="header-icons" id="header-icon-search"></vue-feather>
      <vue-feather
        size="18"
        type="message-square"
        class="header-icons"
        id="header-icon-message"
      ></vue-feather>
      <vue-feather size="18" type="bell" class="header-icons" id="header-icon-bell"></vue-feather>
      <img :src="avatar" class="header-avatar" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: require('@/assets/images/avatar.png'),
    }
  },
}
</script>
