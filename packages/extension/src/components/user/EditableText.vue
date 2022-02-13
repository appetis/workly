<template>
  <div class="w-full">
    <div class="editable-text" @click="changeToText" v-if="!isClick">
      {{ textValue }}
    </div>
    <input
      type="text"
      class="input-text"
      ref="code_5"
      v-if="isClick"
      :value="textValue"
      @blur="changeToDiv"
    />
  </div>
</template>

<script>
export default {
  name: 'EditableText',
  props: {
    textValue: String,
  },
  data() {
    return {
      isClick: false,
    }
  },
  methods: {
    changeToText() {
      this.isClick = true
      this.$nextTick(() => this.$refs.code_5.focus())
    },
    changeToDiv() {
      this.isClick = false
    },
  },
}
</script>
