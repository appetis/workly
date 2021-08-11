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
          <p class="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra sit
            nunc, purus lectus ornare non. Ornare id ac augue sed suspendisse
            erat auctor semper.
          </p>

          <div class="flex mt-6">
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-code"
                ref="code_1"
                @keyup="codeKeyup(1)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-code"
                ref="code_2"
                @keyup="codeKeyup(2)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-code"
                ref="code_3"
                @keyup="codeKeyup(3)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-code"
                ref="code_4"
                @keyup="codeKeyup(4)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-code"
                ref="code_5"
                @keyup="codeKeyup(5)"
              />
            </div>
            <div class="w-1/6 px-1">
              <input
                type="text"
                maxlength="1"
                class="input-code"
                ref="code_6"
                @keyup="codeKeyup(6)"
              />
            </div>
          </div>

          <div class="mt-7">
            <button class="btn-black-full" @click="verifyCode">Continue</button>
          </div>
        </div>
        <div class="modal-footer init-modal-footer">
          Don't have an invite code?
          <span
            class="text-blue cursor-pointer font-semibold underline"
            @click="goSignup"
            >Register</span
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
