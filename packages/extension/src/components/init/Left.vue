<template>
  <div class="w-7/12 bg-wk-dark p-14 text-white">
    <img
      :src="require('@/assets/images/workly.png')"
      alt="workly logo"
      class="h-10"
    />
    <p class="mt-3">
      We are all about the team. Organize projects, meetings, and individual
      schedules to get things done in time.
    </p>
    <div class="text-center mt-14">
      <img :src="require('@/assets/images/workly_screens.png')" alt="info" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'init_left',
}
</script>
