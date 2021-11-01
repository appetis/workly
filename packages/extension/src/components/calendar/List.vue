<template>
  <v-row class="fill-height">
    <v-col>
      <Loading />
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn fab small depressed @click="prev" class="mr-2 ml-1 py-5 px-5">
            <v-icon name="chevron-left" base-class="cv-icon"></v-icon>
          </v-btn>
          <v-btn
            fab
            small
            rounded
            depressed
            @click="next"
            class="mr-5 py-5 px-5"
          >
            <v-icon name="chevron-right" base-class="cv-icon"></v-icon>
          </v-btn>
          <v-btn
            rounded
            depressed
            class="mr-4 py-5 px-4"
            color="accent"
            @click="setToday"
          >
            <span>Today</span>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                rounded
                depressed
                class="py-5 px-4 mr-3"
                v-bind="attrs"
                v-on="on"
              >
                <span class="ml-2 mr-1">{{ typeToMe[me_type] }}</span>
                <v-icon name="chevron-down" base-class="cv-icon mx-1"></v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="me_type = 'me'">
                <v-list-item-title>Me</v-list-item-title>
              </v-list-item>
              <v-list-item @click="me_type = 'all'">
                <v-list-item-title>All</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                rounded
                depressed
                class="py-5 px-4"
                v-bind="attrs"
                v-on="on"
              >
                <span class="ml-2 mr-1">{{ typeToLabel[type] }}</span>
                <v-icon name="chevron-down" base-class="cv-icon mx-1"></v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>


      <v-sheet height="650">

        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>

        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon name="edit-2" base-class="v-icon"></v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon name="heart" base-class="v-icon"></v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon name="more-vertical" base-class="v-icon"></v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import Loading from "../loading/Loading";
export default {
  components: {
    Loading
  },
  data: () => ({
    focus: '',
    me_type: 'me',
    typeToMe: {
      me: 'Me',
      all: 'All',
    },
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      'ca-white',
      'ca-green',
      'ca-blue',
      'ca-purple',
      'ca-orange',
      // 'orange',
      // 'grey darken-1',
    ],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party',
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange()
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      console.log("calendar page init")
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      console.log(event)
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }
      console.log(events)

      this.events = events
      this.$store.dispatch('setLoading', false)
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>

<style scoped>
.cv-icon {
  width: 18px;
  color: #151515;
}
</style>
