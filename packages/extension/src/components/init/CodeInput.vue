<template>
  <div class="w-1/6 px-1">
    <input
      type="text"
      maxlength="1"
      class="
        text-center
        border-b-2 border-solid border-gray-800
        w-full
        text-lg
        py-2
        focus:outline-none focus:border-red-500
      "
      ref="code_1"
      @keyup="codeKeyup(1)"
    />
  </div>
</template>
<script>
export default {
  props: {
    current: {
      required: true,
      type: Number,
    },
  },
  methods: {
    codeKeyup() {
      this.$emit('codeKeyup')
    },
  },
}
</script>
