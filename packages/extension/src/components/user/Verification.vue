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

      <div class="modal-content-xl">
        <div class="flex">
          <Left />
          <div class="w-6/12 relative">
            <Header title="Unlock with Verification Code" />
            <div class="modal-body">
              <p>
                Enter the 6-digit code that was sent to the email address
                {{ email }}
              </p>
              <form @submit.prevent="onSubmit">
                <div class="flex mt-6">
                  <!--            <CodeInput @codeKeyup="codeKeyup" :current="1" />-->
                  <div class="w-1/6 px-1">
                    <input
                      type="text"
                      maxlength="1"
                      class="input-code"
                      ref="code_1"
                      @keyup="codeKeyup(1)"
                      @focus="onFocus(1)"
                    />
                  </div>
                  <div class="w-1/6 px-1">
                    <input
                      type="text"
                      maxlength="1"
                      class="input-code"
                      ref="code_2"
                      @keyup="codeKeyup(2)"
                      @focus="onFocus(2)"
                    />
                  </div>
                  <div class="w-1/6 px-1">
                    <input
                      type="text"
                      maxlength="1"
                      class="input-code"
                      ref="code_3"
                      @keyup="codeKeyup(3)"
                      @focus="onFocus(3)"
                    />
                  </div>
                  <div class="w-1/6 px-1">
                    <input
                      type="text"
                      maxlength="1"
                      class="input-code"
                      ref="code_4"
                      @keyup="codeKeyup(4)"
                      @focus="onFocus(4)"
                    />
                  </div>
                  <div class="w-1/6 px-1">
                    <input
                      type="text"
                      maxlength="1"
                      class="input-code"
                      ref="code_5"
                      @keyup="codeKeyup(5)"
                      @focus="onFocus(5)"
                    />
                  </div>
                  <div class="w-1/6 px-1">
                    <input
                      type="text"
                      maxlength="1"
                      class="input-code"
                      ref="code_6"
                      @keyup="codeKeyup(6)"
                      @focus="onFocus(6)"
                    />
                  </div>
                </div>
                <div
                  class="mt-3 ml-1 text-wk-dark cursor-pointer"
                  @click="resendCode"
                >
                  Resend code
                </div>
                <div
                  class="
                    text-green-700
                    mt-4
                    border border-green-700
                    rounded
                    w-full
                    py-2
                    px-3
                  "
                  v-show="showResendCodeSuccessMessage"
                >
                  {{ showResendCodeSuccessMessage }}
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
                  v-show="showVerifyFailMessage != ''"
                >
                  {{ showVerifyFailMessage }}
                </div>

                <div class="mt-7">
                  <button class="btn-black-full" v-show="!isLoading">
                    Continue
                  </button>
                  <circle2 class="mx-auto" v-show="isLoading"></circle2>
                </div>
              </form>
            </div>
            <!--
            <div class="modal-footer init-modal-footer">
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Circle2 } from 'vue-loading-spinner'
import Left from '@/components/init/Left'
import Header from '@/components/init/Header'
import UserService from '@/services/UserService'

export default {
  name: 'Verification',
  components: {
    Circle2,
    Left,
    Header,
  },
  props: ['callFocus', 'userId', 'email'],
  data() {
    return {
      current: 1,
      showVerifyFailMessage: '',
      showResendCodeSuccessMessage: '',
      //showResendCodeSuccessMessage: 'A new verification code has been resent to your email address.',
      isLoading: false,
    }
  },
  mounted() {
    // if(this.showCode) this.focusInput()
  },
  watch: {
    callFocus() {
      this.focusInput()
    },
  },
  methods: {
    focusInput() {
      //this.$refs['code_1'].focus();
      this.goNextFocus('code_1')
    },
    goNextFocus(next) {
      this.$refs[next].focus()
    },
    onFocus(num) {
      for (let i = 0; i < num; i++) {
        if (!this.$el.getElementsByClassName('input-code')[i].value) {
          this.current = i + 1
          break
        } else {
          if (i === num - 1) this.current = num
        }
      }
      this.goNextFocus('code_' + this.current)
    },
    setCode() {
      let code = ''
      for (let el_code of this.$el.getElementsByClassName('input-code')) {
        code += el_code.value.toUpperCase()
      }
      return code
    },
    codeKeyup(num) {
      this.current = num
      if (this.$refs['code_' + num].value) {
        if (this.current < 6) this.current++
      }
      // else {
      //   this.code += this.code.substring(0, this.code.length - 1)
      //   if (this.current > 1) this.current--
      // }
      this.goNextFocus('code_' + this.current)
    },
    goSignup() {
      this.$emit('goSignup')
    },
    openCalendar() {
      this.$emit('openCalendar')
    },
    onSubmit() {
      const code = this.setCode()
      if (code.length < 6) return false
      this.isLoading = true
      console.log('userId ===>', this.userId)

      const data = {
        req: {
          code: code,
        },
        //id: this.$store.state.user.id,
        id: this.userId,
      }

      this.$store
        .dispatch('verifyCode', data)
        .then(() => {
          console.log('Verification --- lsuccess', this.$store.state.user)
          this.openCalendar()
        })
        .catch((error) => {
          this.showVerifyFailMessage = error.response.data.message
          this.isLoading = false
        })
    },
    async resendCode() {
      console.log('resend Code ===')
      await UserService.resendCode(this.userId)
        .then((response) => {
          console.log("resendCode ==", response)
          this.showResendCodeSuccessMessage = 'A new verification code has been resent to your email address.'
        })
        .catch((error) => {
          this.showVerifyFailMessage = error.response.data.message
          this.isLoading = false
        })
    },
  },
}
</script>
