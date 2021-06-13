<template>
  <div class="left-menu">
    <div class="logo">APPETIS LOGO</div>
    <div class="mt-10 px-1">
      <router-link to="/" class="menu-icon-button" id="menu-icon-calendar"
        ><vue-feather size="34" type="calendar"></vue-feather
      ></router-link>
      <router-link to="/user" class="menu-icon-button" id="menu-icon-user"
        ><vue-feather size="34" type="user"></vue-feather
      ></router-link>
      <router-link to="/link" class="menu-icon-button" id="menu-icon-link"
        ><vue-feather size="34" type="link"></vue-feather
      ></router-link>
    </div>

    <div class="absolute bottom-0 px-1">
      <router-link to="/setting" class="menu-icon-button" id="menu-icon-setting"
        ><vue-feather size="34" type="settings"></vue-feather
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
