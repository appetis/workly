<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="modal">
      <div class="modal-background" aria-hidden="true"></div>

      <!--      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>-->

      <div class="modal-content-md">
        <span class="modal-close" @click="close">
          <vue-feather size="15" type="x"></vue-feather>
        </span>
        <div class="modal-body">
          <div class="sm:flex sm:items-start">
            <div class="profile-photo">
              <img :src="displayImage" />
              <div class="profile-online"></div>
            </div>
            <div class="profile-top">
              <h3
                class="text-md leading-6 font-medium text-gray-900"
                id="profile-name"
              >
                Susan Guerrero
              </h3>
              <div class="mt-0">
                <p class="text-xs text-gray-500" id="profile-position">
                  Project Manager
                </p>
              </div>
              <div class="mt-3">
                <div class="profile-icon">
                  <vue-feather
                    size="14"
                    class="mt-1.5"
                    type="calendar"
                  ></vue-feather>
                </div>
                <div class="profile-icon">
                  <vue-feather
                    size="14"
                    class="mt-1.5"
                    type="mail"
                  ></vue-feather>
                </div>
                <div class="profile-icon">
                  <vue-feather
                    size="14"
                    class="mt-1.5"
                    type="message-square"
                  ></vue-feather>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 text-sm">
            <div class="mb-3 inline-block w-full">
              <vue-feather
                size="17"
                class="text-gray-400 align-middle"
                type="map-pin"
              ></vue-feather>
              <span class="ml-3 align-middle"> In office </span>
            </div>
            <div class="mb-3 inline-block w-full">
              <vue-feather
                size="17"
                class="text-gray-400 align-middle"
                type="user"
              ></vue-feather>
              <span class="ml-3 align-middle">
                Team/department - project manager
              </span>
            </div>
            <div class="mb-3 inline-block w-full">
              <vue-feather
                size="17"
                class="text-gray-400 align-middle"
                type="mail"
              ></vue-feather>
              <span class="ml-3 align-middle"> random@email.com </span>
            </div>
            <div class="mb-3 inline-block w-full">
              <vue-feather
                size="17"
                class="text-gray-400 align-middle"
                type="phone"
              ></vue-feather>
              <span class="ml-3 align-middle"> Ext.335 </span>
            </div>
            <div class="mb-3 inline-block w-full">
              <vue-feather
                size="17"
                class="text-gray-400 align-middle"
                type="smartphone"
              ></vue-feather>
              <span class="ml-3 align-middle"> 647-999-1234 </span>
            </div>
          </div>
        </div>
        <!--        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">-->
        <!--          <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">-->
        <!--            Deactivate-->
        <!--          </button>-->
        <!--          <button type="button" @click="close" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">-->
        <!--            Cancel-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    avatar: {
      required: true,
      type: String,
    },
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
  computed: {
    displayImage() {
      return this.avatar
    },
  },
}
</script>

<style scoped></style>
