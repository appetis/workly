<template>
  <Project />

  <Addproject />
</template>

<script>
import Project from './calendars/Project'
import Addproject from './calendars/Addproject'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    Project,
    Addproject,
  },
  data() {
    return {
      show: false,
    }
  },
}
</script>
