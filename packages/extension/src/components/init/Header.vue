<template>
  <div class="modal-header">
    <img :src="require('@/assets/images/w.png')" alt="worlky small logo">
    <div class="modal-title">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'init_header',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>