<template>
  <div class="w-full">
    <Calendar />
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Home',
  components: {
    Calendar,
  },
}
</script>
