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
            <Header title="Are you new?" />
            <div class="modal-body">
              <h2 class="text-lg pt-4 pb-8">Do you have an invite code?</h2>

              <div class="text-right flex">
                <div class="w-1/2 px-1">
                  <button
                    class="btn-border-black"
                    @click="$emit('goSignup')"
                    id="btn-no"
                  >
                    No
                  </button>
                </div>
                <div class="w-1/2 px-1">
                  <button
                    class="btn-border-black"
                    @click="$emit('goHasCode')"
                    id="btn-yes"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Left from '@/components/init/Left'
import Header from '@/components/init/Header'
export default {
  name: 'Init',
  props: {},
  components: {
    Left,
    Header
  },
  data() {
    return {}
  },
}
</script>
