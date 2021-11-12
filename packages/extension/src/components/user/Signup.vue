<template>
  <div
    class="fixed inset-0 overflow-y-auto z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="init-modal-background" aria-hidden="true"></div>
    <div class="modal">
      <!--      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>-->

      <div class="modal-content-sm">
        <div class="modal-header init-modal-header">
          <div class="w-1/10 bg-wk-gray-box px-2 rounded mr-2">w</div>
          <div class="w-9/10 text-base pt-1 font-semibold">
            Register with Workly
          </div>
        </div>
        <div class="modal-body">
          <!--
          <div class="mb-4">
            <button class="btn-border-black">Continue with Google</button>

            <div class="border-b border-solid border-gray-200 h-6 text-center">
              <span class="relative top-3 bg-white px-10">or</span>
            </div>
          </div>
          -->

          <form @submit.prevent="onSubmit">
            <div>
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                ref="email"
                class="white-board-rounded"
                v-model="user.email"
                v-bind:class="{ 'border-red-700': showRequiredEmail }"
                @blur.prevent="onBlurEmail"
              />
              <span class="text-red-700 ml-1" v-show="showRequiredEmail">{{
                showRequiredEmailMessage
              }}</span>
            </div>
            <div class="pt-2">
              <div class="relative">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  ref="password"
                  class="white-board-rounded"
                  v-model="user.password"
                  v-bind:class="{ 'border-red-700': showRequiredPassword }"
                  @blur.prevent="onBlurPassword"
                />
                <div @click="hidePlainPassword">
                  <v-icon
                    name="eye-off"
                    base-class="input-icon"
                    class="input-icons cursor-pointer"
                    id="password-icon-eye-off"
                    v-show="showPassword"
                  ></v-icon>
                </div>
                <div @click="showPlainPassword">
                  <v-icon
                    name="eye"
                    base-class="input-icon"
                    class="input-icons cursor-pointer"
                    id="password-icon-eye"
                    v-show="!showPassword"
                  ></v-icon>
                </div>
              </div>
              <span class="text-red-700 ml-1" v-show="showRequiredPassword">{{
                showRequiredPasswordMessage
              }}</span>
            </div>
            <div
              class="
                text-red-700
                mt-4
                border border-red-700
                rounded
                w-full
                py-2
                px-3
              "
              v-show="showSignupFailMessage != ''"
            >
              {{ showSignupFailMessage }}
            </div>
            <div class="pt-5">
              <button class="btn-black-full" v-show="!isLoading">
                Sign up with email
              </button>
              <circle2 class="mx-auto" v-show="isLoading"></circle2>
              <div class="text-xs mt-1">
                By signing up, you agree to the Worlky's
                <span class="underline cursor-pointer">Terms of Use</span> and
                <span class="underline cursor-pointer">Privacy Policy</span>.
              </div>
            </div>
          </form>

          <div
            class="border-b border-solid border-gray-200 h-6 text-center"
            v-show="!$store.state.isGuest"
          >
            <span class="relative top-3 bg-white px-10">or</span>
          </div>

          <div class="flex pt-6" v-show="!$store.state.isGuest">
            <div class="w-1/2 pr-1">
              <button
                class="btn-border-black"
                @click="goAsGuest"
                id="btn-quest"
              >
                Continue as a guest
              </button>
            </div>
            <div class="w-1/2 pl-1">
              <button class="btn-border-black" @click="goHasCode" id="btn-code">
                Continue with a code
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer init-modal-footer">
          Already have an account?
          <a
            class="text-blue cursor-pointer underline font-semibold"
            @click="goSignin"
            id="text-login"
            >Login</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Circle2 } from 'vue-loading-spinner'
export default {
  name: 'Signup',
  props: {},
  components: {
    Circle2,
  },
  data() {
    return {
      showRequiredEmail: false,
      showRequiredEmailMessage: '',
      showRequiredPassword: false,
      showRequiredPasswordMessage: '',
      showPassword: false,
      showSignupFailMessage: '',
      isLoading: false,
      user: this.freshUserObject(),
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    goHasCode() {
      this.$emit('goHasCode')
    },
    goSignin() {
      this.$emit('goSignin')
    },
    goAsGuest() {
      this.$emit('goAsGuest')
    },
    goVerification() {
      this.$emit('goVerification')
    },
    onBlurEmail() {
      let error = 0
      if (!this.user.email) {
        this.showRequiredEmail = true
        this.showRequiredEmailMessage = 'Email address is required'
        error++
      } else if (!this.validEmail(this.user.email)) {
        this.showRequiredEmail = true
        this.showRequiredEmailMessage = 'The email address is not correct.'
        error++
      } else {
        this.showRequiredEmail = false
        this.showRequiredEmailMessage = ''
      }
      return error
    },
    onBlurPassword() {
      let error = 0
      if (!this.user.password) {
        this.showRequiredPassword = true
        this.showRequiredPasswordMessage = 'Password is required'
        error++
      } else if (this.user.password.length < 8) {
        this.showRequiredPassword = true
        this.showRequiredPasswordMessage = 'Minimum 8 characters required'
        error++
      } /*else if (!this.validPassword(this.user.password)) {
        this.showRequiredPassword = true
        this.showRequiredPasswordMessage =
          'The password must include lowercase, uppercase, number and special character.'
        error++
      }*/ else {
        this.showRequiredPassword = false
        this.showRequiredPasswordMessage = ''
      }
      return error
    },
    showPlainPassword() {
      this.$refs['password'].type = 'text'
      this.showPassword = true
    },
    hidePlainPassword() {
      this.$refs['password'].type = 'password'
      this.showPassword = false
    },
    onSubmit() {
      let empty = 0
      empty += this.onBlurEmail()
      empty += this.onBlurPassword()
      if (empty) return false
      this.isLoading = true
      this.$store
        .dispatch('createUser', this.user)
        .then(() => {
          this.freshUserObject()
          this.goVerification()
          console.log('success')
        })
        .catch((error) => {
          this.showSignupFailMessage = error.response.data.message
          this.isLoading = false
        })
      /*UserService.addUser(this.user)
        .then(() => {
          this.freshUserObject()
          this.goVerification()
          console.log('success')
        })
        .catch((error) => {
          this.showSignupFailMessage = error.response.data.message
        })*/
    },
    freshUserObject() {
      return {
        email: '',
        password: '',
      }
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validPassword: function (password) {
      //var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
      var paswd = /^(?=.*[0-9])(?=.*)[a-zA-Z0-9!@#$%^&*]{7,15}$/
      return password.match(paswd)
    },
  },
}
</script>
