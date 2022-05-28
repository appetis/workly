<template>
  <div class="w-full">
    <div class="editable-text" @click="changeToText" v-if="!isClick">
      <div v-if="type == 'select'">
        {{ displayText }}
      </div>
      <div v-else>
        {{ textVal }}
      </div>
    </div>
    <!--    <select class="input-select" v-if="type=='select'  && isClick"-->
    <!--            ref="textValue"-->
    <!--            @change="changeToDiv"-->
    <!--    >-->
    <!--      <option v-for="option in statusOptions" v-bind:key="option.id" v-bind:value="option.id"-->
    <!--      :selected="option.id == textVal">{{ option.text }}</option>-->
    <!--    </select>-->
    <v-select
      v-if="type == 'select' && isClick"
      v-model="textVal"
      :items="statusOptions"
      dense
      hide-details
      ref="textValue"
      id="mySelect"
      class="custom input-select"
      @change="changeSelectToDiv"
    ></v-select>

    <input
      type="text"
      class="input-text"
      ref="textValue"
      v-if="type == 'text' && isClick"
      :value="textVal"
      @blur="changeToDiv"
    />
  </div>
</template>
<style>
.custom.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
}
.custom.v-text-field > .v-input__control > .v-input__slot:after {
  border-style: none;
}
.v-select.v-input--dense .v-select__selection--comma {
  font-size: 14px;
}
</style>
<script>
import UserService from '@/services/UserService'
import { mapGetters } from 'vuex'

export default {
  name: 'EditableText',
  props: {
    type: String,
    statusOptions: Array,
    textValue: String,
    textName: String,
    displayText: String,
  },
  data() {
    return {
      isClick: false,
      textVal: this.textValue,
    }
  },
  computed: {
    ...mapGetters(['getLocalStorageUser']),
  },
  methods: {
    changeToText() {
      this.isClick = true
      this.$nextTick(() => this.$refs.textValue.focus())
    },
    changeToDiv() {
      this.isClick = false
      this.textVal = this.$refs.textValue.value
      //this.displayText = this.$refs.textValue.text

      this.afterToDiv()
    },
    changeSelectToDiv(value) {
      this.isClick = false
      this.textVal = value

      this.$nextTick(() => this.afterToDiv())
    },
    afterToDiv() {
      const user = this.getLocalStorageUser
      console.log('edit protile', user, this.textVal)
      console.log('====>', user)
      let data = {}
      data[this.textName] = this.textVal
      UserService.updateProfile(user.id, data)
        .then((response) => {
          console.log('========>', response)
        })
        .catch((error) => {
          console.log('=========>', error)
        })

      this.$emit('edit-profile', this.textVal)
    },
  },
}
</script>
