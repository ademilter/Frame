<template lang="pug">
  .Column.Calendar

    .Column-header
      h3.title CALENDAR

    .Column-body

      table.event-group(
      v-if="hasToken")
        EventDay(
        v-for="(events, key) in eventsByDateGroup"
        :key="key"
        :date="key"
        :events="events")

      button.loginWithGoogle.btn(
      type="button"
      @click="login"
      v-else
      ) Google ile giriş yap

</template>

<script>
  import getAuthToken from '@/utils/get-token'
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
      },
      hasToken () {
        return this.$store.getters.hasToken
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
      },

      login () {
        getAuthToken()
      }
    }

  }
</script>

<style scoped>
  .Column {
    &-header {
      .new {
        background-color: var(--color-calander);
      }
    }
    &-body {
      padding-left: 30px;
      padding-right: 30px;
    }
    .event-group {
      margin-top: -15px;
    }
    .loginWithGoogle {
      border-radius: var(--border-radius);
      color: white;
      background-color: var(--color-calander);
    }
  }
</style>
