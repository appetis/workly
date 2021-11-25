<template>
  <div class="profile-photo" v-bind:class="Profile.status_class">
    <div class="header-no-avatar" v-show="!Profile.avatar">
      <v-icon name="user" base-class="profile-no-icon"></v-icon>
    </div>
    <img :src="Profile.avatar" class="profile-avatar" v-show="Profile.avatar" />
    <!--              <div class="profile-online"></div>-->
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    Profile: null,
  },
}
</script>
