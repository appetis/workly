<template>
  <div class="header">
    <div class="header-title">David Health</div>
    <div class="header-menus">
      <vue-feather
        size="18"
        type="search"
        class="header-icons"
        id="header-icon-search"
      ></vue-feather>
      <vue-feather
        size="18"
        type="message-square"
        class="header-icons"
        id="header-icon-message"
      ></vue-feather>
      <vue-feather
        size="18"
        type="bell"
        class="header-icons"
        id="header-icon-bell"
      ></vue-feather>
      <img
        :src="avatar"
        class="header-avatar rounded-full"
        @click="openProfile()"
      />
    </div>
  </div>

  <Profile v-show="showProfile" @close="closeProfile" :avatar="avatar" />
</template>

<script>
import Profile from './Profile'
export default {
  components: {
    Profile,
  },
  data() {
    return {
      avatar: require('@/assets/images/avatar.png'),
      showProfile: false,
    }
  },
  methods: {
    openProfile() {
      this.showProfile = true
    },
    closeProfile() {
      this.showProfile = false
    },
  },
}
</script>
