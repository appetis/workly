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
        <div class="modal-body">
          <h2 class="text-lg py-4">Verification</h2>
          <p>
            Verification code has been sent to your email address.<br />
            Please check your email.
          </p>

          <div class="flex">
            <!--            <CodeInput @codeKeyup="codeKeyup" :current="1" />-->
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-underline"
                ref="code_1"
                @keyup="codeKeyup(1)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-underline"
                ref="code_2"
                @keyup="codeKeyup(2)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-underline"
                ref="code_3"
                @keyup="codeKeyup(3)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-underline"
                ref="code_4"
                @keyup="codeKeyup(4)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-underline"
                ref="code_5"
                @keyup="codeKeyup(5)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-underline"
                ref="code_6"
                @keyup="codeKeyup(6)"
              />
            </div>
          </div>

          <div class="text-right flex mt-6">
            <div class="w-full px-1">
              <button class="btn-black" @click="verifyCode">Continue</button>
            </div>
          </div>
        </div>
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
    codeKeyup(num) {
      this.current = num
      if (this.$refs['code_' + num].value) {
        if (this.current < 6) this.current++
      } else {
        if (this.current > 1) this.current--
      }
      this.goNextFocus('code_' + this.current)
    },
    verifyCode() {
      console.log('verifyCode')
    },
    goSignup() {
      this.$emit('goSignup')
    },
  },
}
</script>
