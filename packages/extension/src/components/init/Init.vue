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
        <div class="modal-body">
          <h2 class="text-lg pt-4 pb-8">Do you have an invite code?</h2>

          <div class="text-right flex">
            <div class="w-1/2 px-1">
              <button
                class="
                  py-2
                  w-full
                  border border-solid border-black
                  rounded
                  text-sm
                  hover:bg-black hover:text-white
                  font-medium
                "
                @click="goSignup"
              >
                No
              </button>
            </div>
            <div class="w-1/2 px-1">
              <button
                class="
                  py-2
                  w-full
                  border border-solid border-black
                  rounded
                  text-sm
                  hover:bg-black hover:text-white
                  font-medium
                "
                @click="goHasCode"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Init',
  props: {},
  data() {
    return {}
  },
  methods: {
    goHasCode() {
      this.$emit('goHasCode')
    },
    goSignup() {
      this.$emit('goSignup')
    },
  },
}
</script>
