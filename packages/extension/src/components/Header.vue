<template>
  <div class="header">
    <div class="header-title">HW Project (Workly)</div>
    <div class="header-menus">
      <v-icon
        name="search"
        base-class="v-icon"
        class="header-icons"
        id="header-icon-search"
      ></v-icon>
      <v-icon
        name="message-square"
        base-class="v-icon"
        class="header-icons"
        id="header-icon-message"
      ></v-icon>
      <v-icon
        name="bell"
        base-class="v-icon"
        class="header-icons"
        id="header-icon-bell"
      ></v-icon>
      <div class="ml-4 profile-photo profile-online">
        <img
          :src="avatar"
          class="header-avatar"
          @click="openProfile()"
          id="header-profile"
        />
      </div>
    </div>
    <Profile
      v-show="showProfile"
      @close="closeProfile"
      :avatar="avatar"
      id="modal-profile"
    />
  </div>
</template>

<script>
import Profile from './user/Profile'
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
