<template>
  <div class="w-full">
    <List />
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/link/List'
//import customIcon from "vue-icon/lib/vue-feather.esm";

export default {
  name: 'Link',
  components: {
    List,
    //    customIcon,
  },
}
</script>
