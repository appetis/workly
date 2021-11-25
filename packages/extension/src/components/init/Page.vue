<template>
  <div class="w-full h-screen bg-black init-background">
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
      @goSignin="goSignin"
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
      @openCalendar="openCalendar"
      @goVerification="goVerification"
    />
    <Verification
      v-show="showVerification"
      id="modal-verification"
      :userId="userId"
      :email="email"
      @openCalendar="openCalendar"
    />
  </div>
</template>
<script>
import Init from './Init'
import Code from './Code'
import Signup from '../user/Signup'
import Signin from '../user/Signin'
import Verification from '../user/Verification'

export default {
  components: {
    Init,
    Code,
    Signup,
    Signin,
    Verification,
  },
  data() {
    return {
      showInit: false,
      showCode: false,
      showSignup: false,
      showSignin: true,
      showVerification: false,
      callFocus: true,
      userId: 0,
      email: '',
    }
  },
  methods: {
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
      this.showCode = false
      this.showSignup = false
      this.showSignin = true
      console.log('goSignin')
    },
    goVerification(user_id, email = '') {
      this.showInit = false
      this.showCode = false
      this.callFocus = true
      this.showSignup = false
      this.showSignin = false
      this.showVerification = true
      this.userId = user_id
      this.email = email
    },
    goAsGuest() {
      this.showInit = false
      this.showCode = false
      this.showSignup = false
      this.showSignin = false
      this.$store.state.ready = true
      this.$store.state.isGuest = true
      localStorage.isGuest = true
      if (this.$route.path !== '/') this.$router.push('/')
    },
    openCalendar() {
      this.showInit = false
      this.showCode = false
      this.showSignup = false
      this.showSignin = false
      this.showVerification = false
      //this.$root.$refs.header.getInfo()
      //this.$root.$emit('getProfileInfo')
      if (this.$route.path !== '/') this.$router.push('/')
    },
  },
}
</script>
