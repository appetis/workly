<template>
  <div class="left-menu">
    <div class="logo">APPETIS LOGO</div>
    <div class="mt-10 px-1">
      <router-link to="/" class="menu-icon-button" id="menu-icon-calendar"
        ><v-icon name="calendar" base-class="v-icon"></v-icon
      ></router-link>
      <router-link to="/user" class="menu-icon-button" id="menu-icon-user"
        ><v-icon name="user" base-class="v-icon"></v-icon
      ></router-link>
      <router-link to="/link" class="menu-icon-button" id="menu-icon-link"
        ><v-icon name="link" base-class="v-icon"></v-icon
      ></router-link>
    </div>

    <div class="absolute bottom-0 px-1">
      <router-link to="/setting" class="menu-icon-button" id="menu-icon-setting"
        ><v-icon name="settings" base-class="v-icon"></v-icon
      ></router-link>
    </div>
  </div>
</template>
<script>
// import VueFeather from 'vue-feather';
//
// export default {
//   components: {
//     VueFeather
//   },
// }
</script>
