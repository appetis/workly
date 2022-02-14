<template>
  <!--  <div class="profile-photo" v-bind:class="Profile.status_class">
    <div class="header-no-avatar" v-show="!Profile.avatar">
      <v-icon name="user" base-class="profile-no-icon"></v-icon>
    </div>
    <img :src="Profile.avatar" class="profile-avatar" v-show="Profile.avatar" />
  </div>-->
  <div class="relative">
    <div
      class="header-avatar-edit-layer"
      v-show="editable"
      @mouseleave="hideEditAvatar"
      @click="changeAvatar"
    >
      EDIT
      <input
        type="file"
        class="hidden"
        ref="input-avatar"
        @change="uploadAvatarImage"
      />
    </div>
    <v-avatar
      color="teal"
      size="48"
      class="header-no-avatar"
      v-bind:class="cursorPointer"
      v-show="!Profile.avatar"
      id="header-no-profile"
      @click="$emit('clickMethod')"
      @mouseover="showEditAvatar"
    >
      <span class="white--text text-h5"> HW</span>
    </v-avatar>
    <img
      v-show="Profile.avatar"
      :src="Profile.avatar"
      class="header-avatar"
      v-bind:class="cursorPointer"
      id="header-profile"
      @click="$emit('clickMethod')"
      @mouseover="showEditAvatar"
    />
    <div v-bind:class="Profile.status_class"></div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  name: 'avatar',
  props: {
    Profile: null,
    cursorPointer: String,
    editableAvatar: Boolean,
  },
  data() {
    return {
      editable: false,
    }
  },
  methods: {
    showEditAvatar() {
      if (this.editableAvatar && !this.editable) this.editable = true
    },
    hideEditAvatar() {
      if (this.editableAvatar && this.editable) this.editable = false
    },
    changeAvatar() {
      //this.$nextTick(() => this.$refs['input-avatar'].click())
      this.$refs['input-avatar'].click()
    },
    async uploadAvatarImage(e) {
      console.log('upload!')
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.createImage(files[0])
      await UserService.updateAvatar()
    },
    createImage(file) {
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>
