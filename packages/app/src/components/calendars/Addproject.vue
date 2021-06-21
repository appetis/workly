<template>
  <div class="modal-background" v-if="show" aria-hidden="true"></div>
  <transition name="slide-fade" class="slide-fade">
    <div v-if="show" class="text-white">
      <div class="mb-7 text-right cursor-pointer" @click="addNew('event')">
        <div class="inline-flex align-middle mr-5 text-shadow">Event</div>
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
        <div class="inline-flex align-middle mr-5 text-shadow">Meeting</div>
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
        <div class="inline-flex align-middle mr-5 text-shadow">Project</div>
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
        <div class="inline-flex align-middle mr-5 text-shadow">
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

  <button
    class="
      fixed
      right-7
      bottom-7
      rounded-full
      bg-brand-dark
      text-white
      h-18
      w-18
      font-bold
      shadow
      border-0
      focus:outline-none
    "
    @click="show = !show"
  >
    <vue-feather
      v-if="!show"
      size="18"
      type="plus"
      class="pt-1"
      id="project-show-menus"
    ></vue-feather>
    <vue-feather
      v-if="show"
      size="18"
      type="x"
      class="pt-1"
      id="project-hide-menus"
    ></vue-feather>
  </button>
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
  /*z-index: 1;*/
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
</style>
