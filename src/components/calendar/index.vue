<template lang="pug">
  .Column.Calendar

    .Column-header
      h3.title CALENDAR

    .Column-body

      table.event-group
        EventDay(
        v-for="(events, key) in eventsByDateGroup"
        :key="key"
        :date="key"
        :events="events")

</template>

<script>
  import EventDay from './day'
  import iconPlus from '@/icons/plus'

  export default {
    name: 'Calendar',

    components: {
      EventDay,
      iconPlus
    },

    data () {
      return {
        isShow: false
      }
    },

    mounted () {
      if (this.$store.getters.allowNotification) {
        this.checkEvents()
        setInterval(() => {
          this.checkEvents()
        }, 1800000) // 30 minute
      }
    },

    computed: {
      calendarItems () {
        return this.$store.state.calendarItems
      },
      eventsByDateGroup () {
        return this.$store.getters.eventsByDateGroup
      }
    },

    methods: {
      checkEvents () {
        // TODO: maybe need to refactor
        this.calendarItems.forEach(event => {
          const time = this.$moment(event.start.date || event.start.dateTime)
          if (time.isSame(this.$moment(), 'day')) {
            const now = this.$moment()
            const diff = time.format('H') - now.format('H')
            // last one hour
            if (diff > 0 && diff <= 1) {
              /* eslint-disable no-new */
              new Notification(event.summary, {
                body: time.fromNow(),
                icon: './icon-128.png'
              })
            }
          }
        })
      }
    }

  }
</script>

<style scoped>
  .Column {
    .event-group {
      margin-top: -15px;
    }
    &-body {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
</style>
