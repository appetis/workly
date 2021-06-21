<template>
  <div class="app calendar-parent">
    <calendar-view
      :items="items"
      :itemContentHeight="itemContentHeight"
      :itemBorderHeight="itemBorderHeight"
      :monthNameFormat="monthNameFormat"
      :currentPeriodLabel="currentPeriodLabel"
      :show-date="showDate"
      :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
      :enable-drag-drop="true"
      :disable-past="disablePast"
      :disable-future="disableFuture"
      :show-times="false"
      :date-classes="myDateClasses"
      :display-period-uom="displayPeriodUom"
      :display-period-count="displayPeriodCount"
      :starting-day-of-week="startingDayOfWeek"
      :class="themeClasses"
      :period-changed-callback="periodChanged"
      :current-period-label="useTodayIcons ? 'icons' : ''"
      :displayWeekNumbers="displayWeekNumbers"
      :enable-date-selection="true"
      :selection-start="selectionStart"
      :selection-end="selectionEnd"
      @date-selection-start="setSelection"
      @date-selection="setSelection"
      @date-selection-finish="finishSelection"
      @drop-on-date="onDrop"
      @click-date="onClickDay"
      @click-item="onClickItem"
    >
      <template #header="{ headerProps }">
        <calendar-view-header
          :header-props="headerProps"
          @input="setShowDate"
        />
      </template>
    </calendar-view>
  </div>
</template>
<script>
// Load CSS from the published version
import '/node_modules/vue-simple-calendar/dist/style.css'
import '/node_modules/vue-simple-calendar/static/css/default.css'
import '/node_modules/vue-simple-calendar/static/css/holidays-us.css'
// Load CSS from the local repo
//require("../../vue-simple-calendar/static/css/default.css")
//require("../../vue-simple-calendar/static/css/holidays-us.css")

import {
  CalendarView,
  CalendarViewHeader,
  CalendarMath,
} from 'vue-simple-calendar' // published version
//} from "../../vue-simple-calendar/src/components/bundle.js" // local repo

export default {
  name: 'App',
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  data() {
    return {
      /* Show the current month, and give it some fake items to show */
      showDate: this.thisMonth(1),
      message: '',
      startingDayOfWeek: 0,
      monthNameFormat: '2-digit', //2-digit, narrow, short, or long
      currentPeriodLabel: 'Today',
      disablePast: false,
      disableFuture: false,
      displayPeriodUom: 'month',
      displayPeriodCount: 1,
      displayWeekNumbers: false,
      showTimes: true,
      selectionStart: null,
      selectionEnd: null,
      newItemTitle: '',
      newItemStartDate: '',
      newItemEndDate: '',
      useDefaultTheme: true,
      useHolidayTheme: true,
      useTodayIcons: false,
      itemContentHeight: '2.0em',
      itemBorderHeight: '3px',
      items: [
        {
          id: 'e0',
          startDate: '2018-01-05',
        },
        {
          id: 'e1',
          startDate: this.thisMonth(15, 18, 30),
        },
        {
          id: 'e2',
          startDate: this.thisMonth(15),
          title: 'Single-day item with a long title',
        },
        {
          id: 'e3',
          startDate: this.thisMonth(7, 9, 25),
          endDate: this.thisMonth(10, 16, 30),
          title: 'Multi-day item with a long title and times',
        },
        {
          id: 'e4',
          startDate: this.thisMonth(20),
          title: 'My Birthday!',
          classes: ['birthday'],
          url: 'https://en.wikipedia.org/wiki/Birthday',
        },
        {
          id: 'e5',
          startDate: this.thisMonth(5),
          endDate: this.thisMonth(12),
          title: 'Multi-day item',
          classes: ['purple'],
        },
        {
          id: 'foo',
          startDate: this.thisMonth(29),
          title: 'Same day 1',
        },
        {
          id: 'e6',
          startDate: this.thisMonth(29),
          title: 'Same day 2',
          classes: ['orange'],
        },
        {
          id: 'e7',
          startDate: this.thisMonth(29),
          title: 'Same day 3',
        },
        {
          id: 'e8',
          startDate: this.thisMonth(29),
          title: 'Same day 4',
          classes: ['orange'],
        },
        {
          id: 'e9',
          startDate: this.thisMonth(29),
          title: 'Same day 5',
        },
        {
          id: 'e10',
          startDate: this.thisMonth(29),
          title: 'Same day 6',
          classes: ['orange'],
        },
        {
          id: 'e11',
          startDate: this.thisMonth(29),
          title: 'Same day 7',
        },
      ],
    }
  },
  computed: {
    userLocale() {
      return CalendarMath.getDefaultBrowserLocale
    },
    dayNames() {
      return CalendarMath.getFormattedWeekdayNames(this.userLocale, 'long', 0)
    },
    themeClasses() {
      return {
        'theme-default': this.useDefaultTheme,
        'holiday-us-traditional': this.useHolidayTheme,
        'holiday-us-official': this.useHolidayTheme,
      }
    },
    myDateClasses() {
      // This was added to demonstrate the dateClasses prop. Note in particular that the
      // keys of the object are `yyyy-mm-dd` ISO date strings (not dates), and the values
      // for those keys are strings or string arrays. Keep in mind that your CSS to style these
      // may need to be fairly specific to make it override your theme's styles. See the
      // CSS at the bottom of this component to see how these are styled.
      const o = {}
      const theFirst = this.thisMonth(1)
      const ides = [2, 4, 6, 9].includes(theFirst.getMonth()) ? 15 : 13
      const idesDate = this.thisMonth(ides)
      o[CalendarMath.isoYearMonthDay(idesDate)] = 'ides'
      o[CalendarMath.isoYearMonthDay(this.thisMonth(21))] = [
        'do-you-remember',
        'the-21st',
      ]
      return o
    },
  },
  mounted() {
    this.newItemStartDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
    this.newItemEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
  },

  methods: {
    periodChanged() {
      // range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
      // you can listen for changes to the displayed range and react to them (by loading items, etc.)
      //console.log(eventSource)
      //console.log(range)
    },
    thisMonth(d, h, m) {
      const t = new Date()
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
    },
    onClickDay(d) {
      this.selectionStart = null
      this.selectionEnd = null
      this.message = `You clicked: ${d.toLocaleDateString()}`
    },
    onClickItem(e) {
      this.message = `You clicked: ${e.title}`
      console.log(e.title)
    },
    setShowDate(d) {
      this.message = `Changing calendar view to ${d.toLocaleDateString()}`
      this.showDate = d
    },
    setSelection(dateRange) {
      this.selectionEnd = dateRange[1]
      this.selectionStart = dateRange[0]
    },
    finishSelection(dateRange) {
      this.setSelection(dateRange)
      this.message = `You selected: ${this.selectionStart.toLocaleDateString()} -${this.selectionEnd.toLocaleDateString()}`
    },
    onDrop(item, date) {
      this.message = `You dropped ${item.id} on ${date.toLocaleDateString()}`
      // Determine the delta between the old start date and the date chosen,
      // and apply that delta to both the start and end date to move the item.
      const eLength = CalendarMath.dayDiff(item.startDate, date)
      item.originalItem.startDate = CalendarMath.addDays(
        item.startDate,
        eLength
      )
      item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength)
    },
    clickTestAddItem() {
      this.items.push({
        startDate: this.newItemStartDate,
        endDate: this.newItemEndDate,
        title: this.newItemTitle,
        id: 'e' + Math.random().toString(36).substr(2, 10),
      })
      this.message = 'You added a calendar item!'
    },
  },
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #f7fcff;
}

.app {
  /*display: flex;*/
  /*flex-direction: row;*/
  font-family: Calibri, sans-serif;
  /*width: 95vw;*/
  min-width: 30rem;
  max-width: 130rem;
  min-height: 50rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
}

.calendar-controls {
  margin-right: 1rem;
  min-width: 14rem;
  max-width: 14rem;
}

.calendar-parent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 80vh;
  background-color: white;
}
.theme-default .cv-header {
  padding: 10px;
  background-color: #fff;
  border-top: solid 1px #eee;
}

.theme-default .cv-header button.currentPeriod {
  background-color: #151515;
  border-color: #151515;
  color: #fff;
  padding: 13px 20px;
  border-radius: 30px;
  margin: 0 12px;
}
.theme-default .cv-header button.previousYear,
.theme-default .cv-header button.previousPeriod,
.theme-default .cv-header button.nextPeriod,
.theme-default .cv-header button.nextYear {
  background-color: #EEEEEE;
  border-color: #EEEEEE;
  color: #151515;
  border-radius: 30px;
  padding: 10px 13px;
  margin: 0 2px;
}
.theme-default .cv-header button:focus {
  outline: none
}
.theme-default .cv-header .periodLabel {
  font-size: 2em;
}
.theme-default .cv-header-day {
  background-color: #eee;
  border: solid 1px #e5e5e5;
  padding: 10px 0;
  color: #474747;
  font-size: 11px;
  text-transform: uppercase;
}
.cv-weekdays {
  overflow-y: hidden;
}
.cv-day {
  font-size: 11px;
  color: #474747;
}
.cv-day-number {
  margin: 0 auto;
}

.theme-default .cv-item {
  border: 0;
  border-radius: 1.5em;
  color: #fff;
  padding: 7px 20px;
  margin-top: 3px;
  text-align: left;
  background-color: #999;
}
.theme-default .cv-item.continued::before,
.theme-default .cv-item.toBeContinued::after {
  content: ' \21e2 ';
  color: #fff;
}
.theme-default .cv-item .startTime,
.theme-default .cv-item .endTime {
  font-weight: bold;
  color: #fff;
}
.theme-default .cv-item.orange {
  background-color: #e57e28;
  border-color: #e57e28;
}
.theme-default .cv-item.purple {
  background-color: #49197e;
  border-color: #49197e;
}

/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
/*.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
  min-height: 6rem;
}

!* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. *!

!* Add some styling for items tagged with the "birthday" class *!
.theme-default .cv-item.birthday {
  background-color: #e0f0e0;
  border-color: #d7e7d7;
}

.theme-default .cv-item.birthday::before {
  content: '\1F382'; !* Birthday cake *!
  margin-right: 0.5em;
}

!* The following classes style the classes computed in myDateClasses and passed to the component's dateClasses prop. *!
.theme-default .cv-day.ides {
  background-color: #ffe0e0;
}

.ides .cv-day-number::before {
  content: '\271D';
}

.cv-day.do-you-remember.the-21st .cv-day-number::after {
  content: '\1F30D\1F32C\1F525';
}*/
</style>
