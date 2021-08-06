<template>
  <div
    class="fixed inset-0 overflow-y-auto z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="modal-background" aria-hidden="true"></div>
    <div class="modal">
      <!--      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>-->

      <div class="modal-content-sm">
        <div class="modal-header text-center">Worlky Logo</div>
        <div class="modal-body">
          <h2 class="text-2xl font-semibold text-center">Sign in</h2>

          <div class="pt-4">
            <button class="btn-border-black">Continue with Google</button>
          </div>

          <div class="border-b border-solid border-gray-200 h-6 text-center">
            <span class="relative top-3 bg-white px-10">or</span>
          </div>

          <form @submit.prevent="onSubmit">
            <div class="pt-4">
              <label for="username">Email</label>
              <input
                id="username"
                class="white-board-rounded"
                v-model="user.email"
                v-bind:class="{ 'border-red-900': showRequiredEmail }"
              />
            </div>
            <div class="pt-2 relative">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                class="white-board-rounded"
                v-model="user.password"
              />
              <v-icon
                name="eye-off"
                base-class="input-icon"
                class="input-icons"
                id="password-icon-eye-off"
              ></v-icon>
              <v-icon
                name="eye"
                base-class="input-icon"
                class="input-icons"
                id="password-icon-eye"
              ></v-icon>
            </div>
            <div class="pt-5">
              <button type="submit" class="btn-black-full">
                Sign ip with email
              </button>
              <div class="text-xs mt-1">
                By signing up, you agree to the Worlky Terms of Use and Privacy
                Policy.
              </div>
            </div>
          </form>

          <div class="pt-2 text-center">
            Already have an account?
            <span class="text-blue cursor-pointer" @click="goSignup"
              >Sign up</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  props: {},
  data() {
    return {
      showRequiredEmail: false,
      showRequiredPassword: false,
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
    goSignup() {
      this.$emit('goSignup')
    },
    goAsGuest() {
      this.$emit('goAsGuest')
    },
    onSubmit() {
      console.log('submit')
      this.$store
        .dispatch('getToken', this.user)
        .then(() => {
          this.freshUserObject()
          console.log('success')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    freshUserObject() {
      return {
        email: '',
        password: '',
      }
    },
  },
}
</script>
