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
          <div class="w-9/10 pt-1">Unlock Workly with Invite Code</div>
        </div>
        <div class="modal-body">
          <p class="text-sm">Do you have an invite code?</p>

          <form @submit.prevent="onSubmit">
            <div class="flex mt-6">
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

            <div class="mt-7">
              <button class="btn-black-full">Continue</button>
            </div>
          </form>
        </div>
        <div class="modal-footer init-modal-footer">
          Don't have an invite code?
          <span
            class="text-blue cursor-pointer font-semibold underline"
            @click="goSignup"
            >Register</span
          >
          |
          <span
            class="text-blue cursor-pointer font-semibold underline"
            @click="goSignin"
            >Login</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import CodeInput from "./CodeInput";
export default {
  name: 'Code',
  components: {
    //  CodeInput
  },
  props: ['callFocus'],
  data() {
    return {
      current: 1,
    }
  },
  mounted() {
    this.focusInput()
    // if(this.showCode) this.focusInput()
  },
  watch: {
    callFocus() {
      console.log('====>', 'callFocus')
      this.focusInput()
    },
  },
  methods: {
    focusInput() {
      //this.$refs['code_1'].focus();
      this.goNextFocus('code_1')
    },
    goNextFocus(next) {
      console.log('===>', next)
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
      //   //if (this.current > 1) this.current--
      // }

      this.goNextFocus('code_' + this.current)
    },
    goSignup() {
      this.$emit('goSignup')
    },
    goSignin() {
      this.$emit('goSignin')
    },
    onSubmit() {
      const code = this.setCode()
      if (code.length < 6) return false
      console.log(code)

      this.$store
        .dispatch('verifyCode', code)
        .then(() => {
          this.freshUserObject()
          console.log('success')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
