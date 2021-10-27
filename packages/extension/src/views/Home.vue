<template>
  <v-app class="home">
    <List />
    <Add v-show="$store.state.ready" />
  </v-app>
</template>

<script>
// @ is an alias to /src
import List from '@/components/calendar/List'
import Add from '@/components/calendar/Add'
//import customIcon from "vue-icon/lib/vue-feather.esm";

export default {
  name: 'Home',
  components: {
    List,
    Add,
  },
  data: function () {
    return {
      baseClass: 'v-icon',
    }
  },
}
</script>
