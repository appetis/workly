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
        <span class="modal-close" @click="close">
          <v-icon name="x" base-class="v-icon"></v-icon>
        </span>
        <div class="modal-body" v-if="profile">
          <div>
            <Avatar :Profile="profile.Profile" />
            <div class="profile-top">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="profile-name"
              >
                {{ profile.Profile.name }}
              </h3>
              <div class="mt-0">
                <span
                  class="
                    inline-block
                    bg-wk-defgray
                    rounded-sm
                    px-2
                    mr-2
                    text-white
                  "
                >
                  Admin
                </span>
                <p
                  class="
                    inline-block
                    text-sm text-brand-defgray
                    profile-position
                  "
                >
                  {{ profile.Profile.position }}
                </p>
              </div>

              <!-- // For version 2
              <div class="mt-3">
                <div class="profile-icon">
                  <v-icon name="calendar" base-class="vb-icon"></v-icon>
                </div>
                <div class="profile-icon">
                  <v-icon name="mail" base-class="vb-icon"></v-icon>
                </div>
                <div class="profile-icon">
                  <v-icon name="message-square" base-class="vb-icon"></v-icon>
                </div>
              </div>
              -->
            </div>
          </div>
          <div class="mt-8 text-sm">
            <div class="mb-3 inline-block w-full">
              <span class="w-18">
                <v-icon
                  name="map-pin"
                  base-class="pv-icon"
                  class="text-brand-defgray"
                ></v-icon>
              </span>
              <span class="ml-3 align-middle" id="profile-status">
                In office
              </span>
            </div>
            <div class="mb-3 inline-block w-full">
              <v-icon
                name="user"
                base-class="pv-icon"
                class="text-brand-defgray"
              ></v-icon>
              <span class="ml-3 align-middle">
                <span id="profile-department">{{
                  profile.Profile.department
                }}</span>
                -
                <span class="profile-position">{{
                  profile.Profile.position
                }}</span>
              </span>
            </div>
            <div class="mb-3 inline-block w-full">
              <v-icon
                name="mail"
                base-class="pv-icon"
                class="text-brand-defgray"
              ></v-icon>
              <span class="ml-3 align-middle" id="profile-email">
                {{ profile.email }}
              </span>
            </div>
            <div class="mb-3 inline-block w-full">
              <v-icon
                name="phone"
                base-class="pv-icon"
                class="text-brand-defgray"
              ></v-icon>
              <span class="ml-3 align-middle">
                Ext.
                <span id="profile-phone-ext">{{
                  profile.Profile.phone_ext
                }}</span>
              </span>
            </div>
            <div class="mb-3 inline-block w-full">
              <v-icon
                name="smartphone"
                base-class="pv-icon"
                class="text-brand-defgray"
              ></v-icon>
              <span class="ml-3 align-middle" id="profile-phone">
                {{ profile.Profile.phone }}
              </span>
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
import Avatar from './Avatar'
export default {
  name: 'Profile',
  props: {
    profile: null,
  },
  components: {
    Avatar,
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
<style scoped>
.pv-icon {
  width: 20px;
}
.vb-icon {
  width: 22px;
}
</style>
