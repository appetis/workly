<template>
  <div class="w-full">
    <h1>This is an user page</h1>
    <List />
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/user/List'
//import customIcon from "vue-icon/lib/vue-feather.esm";

export default {
  name: 'User',
  components: {
    List,
    //    customIcon,
  },
}
</script>
