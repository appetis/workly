<template>
  <div class="header">
    <div class="header-title" data-testid="project-name">{{ projectName }}</div>
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
      <div class="mr-2 mt-3" v-show="isLoading">
<!--        <DoubleBounce class="mx-auto" v-show="isLoading"></DoubleBounce>-->
      </div>
      <!--      <div
        class="ml-4 profile-photo"
        v-if="profile"
        v-bind:class="profile.Profile.status_class"
        v-show="!isLoading"
      >
        <div
          class="header-no-avatar"
          v-show="!profile.Profile.avatar"
          @click="openProfile()"
          id="header-no-profile"
        >
          <v-icon name="user" base-class="profile-no-icon"></v-icon>
        </div>
        <img
          v-show="profile.Profile.avatar"
          :src="profile.Profile.avatar"
          class="header-avatar"
          @click="openProfile()"
          id="header-profile"
        />
      </div>-->
      <Avatar
        v-if="profile"
        v-show="!isLoading"
        :Profile="profile.Profile"
        @clickMethod="openProfile"
        :cursorPointer="'cursor-pointer'"
        :editableAvatar="false"
      />
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
<script>
import Profile from './user/Profile'
import UserService from '@/services/UserService'
import Avatar from '@/components/user/Avatar'
//import { DoubleBounce } from 'vue-loading-spinner'
import { mapGetters } from 'vuex'
export default {
  components: {
    Profile,
 //   DoubleBounce,
    Avatar,
  },
  data() {
    return {
      //avatar: require('@/assets/images/avatar.png'),
      isLoading: this.$store.state.isGuest ? false : true,
      projectName: 'My project',
      avatar: null,
      profile: null,
      showProfile: false,
      isGuest: this.$store.state.isGuest,
      css: {
        profileTop: '100px',
      },
    }
  },
  computed: {
    ...mapGetters(['getLocalStorageUser']),
  },
  methods: {
    openProfile() {
      //this.$refs.profile.getProfile()
      this.showProfile = true
    },
    closeProfile() {
      this.showProfile = false
    },
    async getInfoData() {
      const user = this.getLocalStorageUser
      //const user = this.$store.state.user

      //console.log("user ===>", this.$store.state.user, JSON.stringify(user))
      if (user && user.id && !this.isGuest) {
        await UserService.getUser(user.id)
          .then((response) => {
            //this.avatar = require('../assets/images/profile.jpeg')
            //console.log("response data ===>", response.data)
            this.profile = response.data.user
            this.profile.Profile.status_class = this.getProfileClass(
              this.profile.Profile.status
            )
            this.isLoading = false
          })
          .catch((error) => {
            this.isLoading = false
            throw error
          })
      }
    },
    async getUserStatus() {
      const user = this.getLocalStorageUser
      if (user && user.id) {
        await UserService.getUserStatus(user.id)
          .then((response) => {
            this.profile.Profile.status_class = this.getProfileClass(
              response.data.statusCode
            )
            this.isLoading = false
          })
          .catch((error) => {
            this.isLoading = false
            throw error
          })
      }
    },
    getStatus(exec) {
      let interval
      if (exec) {
        interval = window.setInterval(() => {
          this.getUserStatus()
        }, 100000)
      } else {
        clearInterval(interval)
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
  mounted: async function () {
    if (this.isGuest) this.isLoading = false
    else this.getStatus(true)

    // if (document.getElementById('my-datatable')) return; // was already loaded
    // var scriptTag = document.createElement("script");
    // scriptTag.src = "https://cdn.datatables.net/v/dt/dt-1.10.16/sl-1.2.5/datatables.min.js";
    // scriptTag.id = "my-datatable";
    // document.getElementsByTagName('head')[0].appendChild(scriptTag);
  },
  async created() {
    await this.getInfoData()
  },
}
</script>
