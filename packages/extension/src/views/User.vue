<template>
  <div class="w-full" data-app>
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
  methods: {
    addMember() {
      console.log('add member')
    },
  },
}
</script>
