<template>
  <div class="header">
    <div class="header-title">David Health</div>
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
      <div class="relative">
        <img
          :src="avatar"
          class="header-avatar rounded-full"
          @click="openProfile()"
          id="header-profile"
        />
        <div class="profile-online-sm"></div>
      </div>
    </div>
    <Profile
      v-show="showProfile"
      @close="closeProfile"
      :avatar="avatar"
      id="modal-profile"
    />
    <Init
      v-show="showInit"
      id="modal-init"
      @goHasCode="goHasCode"
      @goSignup="goSignup"
    />
    <Code v-show="showCode" id="modal-code" :callFocus="callFocus" />
  </div>
</template>

<script>
import Profile from './user/Profile'
import Init from './init/Init'
import Code from './init/Code'
export default {
  components: {
    Profile,
    Init,
    Code,
  },
  data() {
    return {
      showInit: true,
      showCode: false,
      avatar: require('@/assets/images/avatar.png'),
      showProfile: false,
      callFocus: false,
    }
  },
  methods: {
    openProfile() {
      this.showProfile = true
    },
    closeProfile() {
      this.showProfile = false
    },
    goHasCode() {
      this.showInit = false
      this.showCode = true
      this.callFocus = true
      console.log('goHasCode')
    },
    goSignup() {
      this.showInit = false
      console.log('goSignup')
    },
  },
}
</script>
