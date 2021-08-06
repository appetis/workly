<template>
  <div class="w-full">
    <List />
  </div>
</template>
<script>
// @ is an alias to /src
import List from '@/components/setting/List'
//import customIcon from "vue-icon/lib/vue-feather.esm";

export default {
  name: 'Setting',
  components: {
    List,
    //    customIcon,
  },
}
</script>
