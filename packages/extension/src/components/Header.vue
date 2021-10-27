<template>
  <div class="header">
    <div class="header-title">HW Project (Workly)</div>
    <div class="header-menus">
      <!-- For version 2
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
      -->

      <div
        class="ml-4 profile-photo"
        v-if="profile"
        v-bind:class="profile.Profile.status_class"
      >
        <div
          class="header-no-avatar"
          v-if="!profile.Profile.avatar"
          @click="openProfile()"
          id="header-no-profile"
        >
          <v-icon name="user" base-class="profile-no-icon"></v-icon>
        </div>
        <img
          v-if="profile.Profile.avatar"
          :src="profile.Profile.avatar"
          class="header-avatar"
          @click="openProfile()"
          id="header-profile"
        />
      </div>
    </div>
    <Profile
      v-show="showProfile"
      @close="closeProfile"
      :profile="profile"
      id="modal-profile"
      ref="profile"
    />
  </div>
</template>
Ω
<script>
import Profile from './user/Profile'
import UserService from '@/services/UserService'
export default {
  components: {
    Profile,
  },
  data() {
    return {
      //avatar: require('@/assets/images/avatar.png'),
      avatar: null,
      profile: null,
      showProfile: false,
    }
  },
  methods: {
    openProfile() {
      //this.$refs.profile.getProfile()
      this.showProfile = true
    },
    closeProfile() {
      this.showProfile = false
    },
    getInfo() {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log('===== getInfo', user)
      if (user) {
        UserService.getUser(user.id)
          .then((response) => {
            //this.avatar = require('../assets/images/profile.jpeg')
            this.profile = response.data.user
            this.profile.Profile.status_class = this.getProfileClass(
              response.data.user.Profile.status
            )
          })
          .catch((error) => {
            throw error
          })
      }
    },
    getProfileClass(status) {
      let status_color = ''
      switch (status) {
        case 'VA':
          status_color = 'vacation'
          break
        case 'OF':
          status_color = 'online'
          break
        default:
          status_color = 'other'
      }
      return `profile-${status_color}`
    },
  },
  mounted: function () {
    this.getInfo()

    // if (document.getElementById('my-datatable')) return; // was already loaded
    // var scriptTag = document.createElement("script");
    // scriptTag.src = "https://cdn.datatables.net/v/dt/dt-1.10.16/sl-1.2.5/datatables.min.js";
    // scriptTag.id = "my-datatable";
    // document.getElementsByTagName('head')[0].appendChild(scriptTag);

    window.setInterval(() => {
      this.getInfo()
    }, 100000)
  },
}
</script>
