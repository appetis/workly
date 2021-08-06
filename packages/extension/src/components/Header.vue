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
    <Code
      v-show="showCode"
      id="modal-code"
      :callFocus="callFocus"
      @goSignup="goSignup"
    />
    <Signup
      v-show="showSignup"
      id="modal-signup"
      @goHasCode="goHasCode"
      @goSignin="goSignin"
      @goVerification="goVerification"
      @goAsGuest="goAsGuest"
    />
    <Signin
      v-show="showSignin"
      id="modal-signin"
      @goHasCode="goHasCode"
      @goSignup="goSignup"
      @goAsGuest="goAsGuest"
    />
    <Verification
        v-show="showVerification"
        id="modal-signup"
        @openCalendar="openCalendar"
    />
  </div>
</template>

<script>
import Profile from './user/Profile'
import Init from './init/Init'
import Code from './init/Code'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Verification from './user/Verification'
export default {
  components: {
    Profile,
    Init,
    Code,
    Signup,
    Signin,
    Verification
  },
  data() {
    return {
      showInit: true,
      showCode: false,
      showSignup: false,
      showSignin: false,
      showVerification: false,
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
    goInit() {
      this.showInit = true
      this.showCode = false
    },
    goHasCode() {
      this.showInit = false
      this.showCode = true
      this.callFocus = true
      this.showSignup = false
      this.showSignin = false
      console.log('goHasCode')
    },
    goSignup() {
      this.showInit = false
      this.showCode = false
      this.showSignup = true
      this.showSignin = false
      console.log('goSignup')
    },
    goSignin() {
      this.showInit = false
      this.showSignup = false
      this.showSignin = true
      console.log('goSignin')
    },
    goVerification() {
      this.showInit = false
      this.showCode = false
      this.showSignup = false
      this.showSignin = false
      this.showVerification = true
    },
    goAsGuest() {
      this.showInit = false
      this.showCode = false
      this.showSignup = false
      this.showSignin = false
      console.log('goAsGuest')
    },
    openCalendar() {
      this.showInit = false
      this.showCode = false
      this.showSignup = false
      this.showSignin = false
      this.showVerification = false
    }
  },
}
</script>
