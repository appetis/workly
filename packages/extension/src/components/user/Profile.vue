<template>
  <!--  <div
     class="fixed inset-0 overflow-y-auto z-10"
     aria-labelledby="modal-title"
     role="dialog"
     aria-modal="true"
   >-->
  <div class="profile-modal">
    <div class="modal-background" @click="close" aria-hidden="true"></div>
    <!--      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>-->

    <div class="modal-content-sm">
      <span class="modal-close" @click="close">
        <v-icon name="x" base-class="close-icon"></v-icon>
      </span>

      <div class="modal-body" v-if="profile">
        <div>
          <div class="profile-top flex justify-between">
            <div class="w-full">
              <EditableText
                class="text-base leading-6 font-semibold text-gray-900 mt-3"
                :type="'text'"
                :text-name="'name'"
                :text-value="profile.Profile.name"
              />
              <div class="mt-0.5">
                <span
                  class="inline-block bg-wk-light-point rounded-sm px-2 mr-2 text-white"
                >
                  Admin
                </span>
                <p class="inline-block text-xs text-wk-defgray">
                  {{ profile.Profile.position }}
                </p>
              </div>
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
            <div class="mx-1">
              <Avatar
                :Profile="profile.Profile"
                :statusClass="statusClass"
                @clickMethod="editAvatar"
                :cursorPointer="'cursor-pointer'"
                :editableAvatar="true"
              />
            </div>
          </div>
        </div>
        <div class="mt-4 text-sm">
          <div class="mb-1 flex items-center">
            <v-icon
              name="map-pin"
              base-class="pv-icon"
              class="text-wk-light-point"
            ></v-icon>
            <EditableText
              class="ml-2"
              :type="'select'"
              :status-options="status_options"
              :text-name="'status'"
              :text-value="profile.Profile.status"
              :display-text="profile.Profile.statusName"
              @edit-profile="updateProfileStatus"
            />
          </div>
          <!--          <div class="mb-1 flex items-center">
            <v-icon
              name="user"
              base-class="pv-icon"
              class="text-wk-light-point"
            ></v-icon>
            <div class="flex">
              <EditableText
                class="ml-2 flex-1"
                :text-value="profile.Profile.department"
              />
              <div class="pt-1 align-center flex-1">-</div>
              <EditableText
                class="ml-2"
                :text-value="profile.Profile.position"
              />
            </div>
          </div>-->
          <div class="mb-1 flex items-center">
            <v-icon
              name="grid"
              base-class="pv-icon"
              class="text-wk-light-point"
            ></v-icon>
            <EditableText
              class="ml-2 flex-1"
              :type="'text'"
              :text-name="'department'"
              :text-value="profile.Profile.department"
            />
          </div>
          <div class="mb-1 flex items-center">
            <v-icon
              name="briefcase"
              base-class="pv-icon"
              class="text-wk-light-point"
            ></v-icon>
            <EditableText
              class="ml-2 flex-1"
              :type="'text'"
              :text-name="'position'"
              :text-value="profile.Profile.position"
              @edit-profile="updateProfilePosition"
            />
          </div>
          <div class="mb-1 flex items-center">
            <v-icon
              name="mail"
              base-class="pv-icon"
              class="text-wk-light-point"
            ></v-icon>
            <EditableText
              class="ml-2"
              :type="'text'"
              :text-name="'email'"
              :text-value="profile.email"
            />
          </div>
          <div class="mb-1 flex items-center">
            <v-icon
              name="phone"
              base-class="pv-icon"
              class="text-wk-light-point"
            ></v-icon>
            <div class="ml-2 flex">
              <div class="pt-1">Ext.</div>
              <EditableText
                class="ml-2"
                :type="'text'"
                :text-name="'phone_ext'"
                :text-value="profile.Profile.phone_ext"
              />
            </div>
          </div>
          <div class="mb-1 flex items-center">
            <v-icon
              name="smartphone"
              base-class="pv-icon"
              class="text-wk-light-point"
            ></v-icon>
            <EditableText
              class="ml-2"
              :type="'text'"
              :text-name="'phone'"
              :text-value="profile.Profile.phone"
            />
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
  <!--  </div>-->
</template>

<script>
import Avatar from './Avatar'
import EditableText from './EditableText'
import UserService from '@/services/UserService'

export default {
  name: 'Profile',
  props: {
    profile: null,
    statusClass: String,
  },
  components: {
    Avatar,
    EditableText,
  },
  data() {
    return {
      status_options: [
        { text: 'In office', value: 'OF' },
        { text: 'Work from home', value: 'WH' },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    editAvatar() {
      const user = this.getLocalStorageUser
      console.log('edit protile', user.id)
      UserService.updateProfile(user.id)
        .then((response) => {
          console.log('========>', response)
        })
        .catch((error) => {
          console.log('=========>', error)
        })
    },
    updateProfileStatus(val) {
      for (const status_option of this.status_options) {
        if (status_option.value === val)
          this.profile.Profile.statusName = status_option.text
      }
      this.$emit('change-profile-status', val)

      //this.profile.Profile.statusName =
    },
    updateProfilePosition(val) {
      this.profile.Profile.position = val
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
