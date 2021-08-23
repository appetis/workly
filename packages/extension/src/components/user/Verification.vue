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
          <div
            class="w-1/10 bg-wk-gray-box px-2 rounded mr-2 align-middle pt-1"
          >
            W
          </div>
          <div class="w-9/10 pt-1">Unlock Workly with Verification Code</div>
        </div>
        <div class="modal-body">
          <p class="text-sm">
            Verification code has been sent to your email address. Please check
            your email.
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
                  @focus="onFocus()"
                />
              </div>
              <div class="w-1/6 px-1">
                <input
                  type="text"
                  maxlength="1"
                  class="input-code"
                  ref="code_2"
                  @keyup="codeKeyup(2)"
                  @focus="onFocus()"
                />
              </div>
              <div class="w-1/6 px-1">
                <input
                  type="text"
                  maxlength="1"
                  class="input-code"
                  ref="code_3"
                  @keyup="codeKeyup(3)"
                  @focus="onFocus()"
                />
              </div>
              <div class="w-1/6 px-1">
                <input
                  type="text"
                  maxlength="1"
                  class="input-code"
                  ref="code_4"
                  @keyup="codeKeyup(4)"
                  @focus="onFocus()"
                />
              </div>
              <div class="w-1/6 px-1">
                <input
                  type="text"
                  maxlength="1"
                  class="input-code"
                  ref="code_5"
                  @keyup="codeKeyup(5)"
                  @focus="onFocus()"
                />
              </div>
              <div class="w-1/6 px-1">
                <input
                  type="text"
                  maxlength="1"
                  class="input-code"
                  ref="code_6"
                  @keyup="codeKeyup(6)"
                  @focus="onFocus()"
                />
              </div>
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
              <button class="btn-black-full">Continue</button>
            </div>
          </form>
        </div>

        <div class="modal-footer init-modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
//import CodeInput from "./CodeInput";
export default {
  name: 'Verification',
  components: {
    //  CodeInput
  },
  props: ['callFocus'],
  data() {
    return {
      current: 1,
      showVerifyFailMessage: '',
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
    onSubmit() {
      const code = this.setCode()
      if (code.length < 6) return false

      const data = {
        req: {
          code: code,
        },
        id: this.$store.state.user.id,
      }

      this.$store
        .dispatch('verifyCode', data)
        .then(() => {
          this.freshUserObject()
          console.log('success')
        })
        .catch((error) => {
          this.showVerifyFailMessage = error.response.data.message
        })
    },
  },
}
</script>
