<template>
  <div class="left-menu">
    <div>
      <img :src="logo" />
    </div>
    <div class="mt-10 px-1">
      <router-link to="/" class="menu-icon-button" id="menu-icon-calendar"
        ><v-icon name="calendar" base-class="v-icon"></v-icon
      ></router-link>
      <router-link to="/link" class="menu-icon-button" id="menu-icon-link"
        ><v-icon name="link" base-class="v-icon"></v-icon
      ></router-link>
      <router-link
        to="/user"
        class="menu-icon-button"
        id="menu-icon-user"
        v-show="!$store.state.isGuest"
        ><v-icon name="users" base-class="v-icon"></v-icon
      ></router-link>
      <div
        class="menu-icon-button cursor-pointer member_only"
        id="menu-icon-guest-user"
        @click="onMemberOnly($event)"
        v-show="$store.state.isGuest"
      >
        <v-icon name="users" base-class="v-icon"></v-icon>
      </div>
    </div>

    <!--    ifGuest: {{ $store.state.isGuest }}-->

    <div class="absolute bottom-0 px-1" v-show="!$store.state.isGuest">
      <router-link to="/setting" class="menu-icon-button" id="menu-icon-setting"
        ><v-icon name="settings" base-class="v-icon"></v-icon
      ></router-link>
    </div>

    <div
      class="member-only-form"
      :style="{ top: css.signupTop }"
      v-show="showTextSignup"
    >
      <span class="close" @click="close">
        <v-icon size="15" name="x"></v-icon>
      </span>

      <div class="inline-block w-full">
        <!--        <v-icon
            class="text-gray-400 align-middle w-4"
            name="log-in"
        ></v-icon>-->
        <li
          class="ml-1 align-middle cursor-pointer text-black"
          @click="goSignup"
        >
          Sign up for free
        </li>
      </div>
    </div>
    <Signup
      v-show="showSignup"
      id="modal-signup"
      @goSignin="goSignin"
      @goVerification="goVerification"
    />
    <Signin
      v-show="showSignin"
      id="modal-signin"
      @goSignup="goSignup"
      @goVerification="goVerification"
      @openCalendar="openCalendar"
    />
    <Verification
      v-show="showVerification"
      id="modal-verification"
      @openCalendar="openCalendar"
    />
  </div>
</template>
<script>
import Signup from './user/Signup'
import Signin from './user/Signin'
import Verification from './user/Verification'
export default {
  components: {
    Signup,
    Signin,
    Verification,
  },
  data() {
    return {
      logo: require('@/assets/images/logo_s.png'),
      showTextSignup: false,
      css: {
        signupTop: '100px',
      },
      showSignup: false,
      showSignin: false,
      showVerification: false,
      callFocus: true,
    }
  },
  methods: {
    onMemberOnly(event) {
      var sWidth = window.innerWidth
      var sHeight = window.innerHeight
      const signupForm = document.querySelector('.member-only-form')

      var oWidth = signupForm.offsetWidth
      var oHeight = signupForm.offsetHeight

      var divLeft = event.clientX + 10
      var divTop = event.clientY - 30

      if (divLeft + oWidth > sWidth) divLeft -= oWidth
      if (divTop + oHeight > sHeight) divTop -= oHeight

      if (divLeft < 0) divLeft = 0
      if (divTop < 0) divTop = 0

      this.css.signupTop = divTop + 'px'
      this.showTextSignup = true
    },
    close() {
      this.showTextSignup = false
    },
    goSignup() {
      this.close()
      this.showSignup = true
      this.showSignin = false
      console.log('goSignup')
    },
    goSignin() {
      this.close()
      this.showSignup = false
      this.showSignin = true
      console.log('goSignin')
    },
    goVerification() {
      this.callFocus = true
      this.showSignup = false
      this.showSignin = false
      this.showVerification = true
    },
    openCalendar() {
      this.showSignup = false
      this.showSignin = false
      this.showVerification = false
    },
  },
  created() {
    //console.log('LeftMenu ===>', this.$store.state.isGuest)
  },
}
</script>
