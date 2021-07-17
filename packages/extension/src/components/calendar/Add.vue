<template>
  <div class="fixed right-9 bottom-20 z-10">
    <div class="modal-background" v-if="show" aria-hidden="true"></div>
    <transition name="slide-fade">
      <div v-if="show" class="text-white slide-fade">
        <div class="mb-7 text-right cursor-pointer" @click="addNew('event')">
          <div class="inline-flex align-middle mr-5 text-shadow text-base">
            Event
          </div>
          <div
            class="
              inline-flex
              align-middle
              bg-white
              text-brand-dark
              rounded-full
              h-14
              w-14
              shadow-sm
            "
          >
            <EventIcon class="m-auto" width="24" />
          </div>
        </div>
        <div class="mb-7 text-right cursor-pointer" @click="addNew('meeting')">
          <div class="inline-flex align-middle mr-5 text-shadow text-base">
            Meeting
          </div>
          <div
            class="
              inline-flex
              align-middle
              bg-white
              text-brand-dark
              rounded-full
              h-14
              w-14
              shadow-sm
            "
          >
            <MeetingIcon class="m-auto" width="24" />
          </div>
        </div>
        <div class="mb-7 text-right cursor-pointer" @click="addNew('project')">
          <div class="inline-flex align-middle mr-5 text-shadow text-base">
            Project
          </div>
          <div
            class="
              inline-flex
              align-middle
              bg-white
              text-brand-dark
              rounded-full
              h-14
              w-14
              shadow-sm
            "
          >
            <ProjectIcon class="m-auto" width="24" />
          </div>
        </div>
        <div class="mb-7 text-right cursor-pointer" @click="addNew('vacation')">
          <div class="inline-flex align-middle mr-5 text-shadow text-base">
            Out of Office
          </div>
          <div
            class="
              inline-flex
              align-middle
              bg-white
              text-brand-dark
              rounded-full
              h-14
              w-14
              shadow-sm
            "
          >
            <VacationIcon class="m-auto" width="24" />
          </div>
        </div>
      </div>
    </transition>

    <v-btn
      class="fixed mx-2 right-7 bottom-7"
      fab
      large
      color="accent"
      @click="show = !show"
    >
      <v-icon
        name="plus"
        base-class="cv-icon"
        v-if="!show"
        id="project-show-menus"
      ></v-icon>
      <v-icon
        name="x"
        base-class="cv-icon"
        v-if="show"
        id="project-hide-menus"
      ></v-icon>
    </v-btn>
  </div>
</template>
<script>
import EventIcon from '../icons/Event'
import MeetingIcon from '../icons/Meeting'
import ProjectIcon from '../icons/Project'
import VacationIcon from '../icons/Vacation'
export default {
  components: {
    EventIcon,
    MeetingIcon,
    ProjectIcon,
    VacationIcon,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    addNew(type) {
      console.log(type)
    },
  },
}
</script>

<style>
.slide-fade {
  position: fixed;
  bottom: 100px;
  right: 36px;
  z-index: 3;
}
.slide-fade p {
  margin-top: 20px;
  background-color: #fff;
}
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  /*transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);*/
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.cv-icon {
  width: 38px;
}
</style>
