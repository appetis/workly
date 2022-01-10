<template>
  <!--  <div class="profile-photo" v-bind:class="Profile.status_class">
    <div class="header-no-avatar" v-show="!Profile.avatar">
      <v-icon name="user" base-class="profile-no-icon"></v-icon>
    </div>
    <img :src="Profile.avatar" class="profile-avatar" v-show="Profile.avatar" />
  </div>-->
  <div class="relative">
    <v-avatar
      color="teal"
      size="48"
      class="header-no-avatar"
      v-bind:class="cursorPointer"
      v-show="!Profile.avatar"
      id="header-no-profile"
      @click="$emit('openProfile')"
    >
      <span class="white--text text-h5"> HW</span>
    </v-avatar>
    <img
      v-show="Profile.avatar"
      :src="Profile.avatar"
      class="header-avatar rounded-full shadow-sm"
      v-bind:class="cursorPointer"
      id="header-profile"
      @click="$emit('openProfile')"
    />
    <div v-bind:class="Profile.status_class"></div>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    Profile: null,
    cursorPointer: String,
  },
}
</script>
