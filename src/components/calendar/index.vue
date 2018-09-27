<template lang="pug">
  .Column

    .Column-header
      h3.title CALENDAR
      button(
      class="btn small new"
      type="button"
      @click="refresh")
        iconRefresh
        span Refresh

    .Column-body

      .event-group(
      v-if="hasCalenderItem || hasToken")
        EventDay(
        v-for="(events, key) in eventsSortAndGroupBy"
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
  import iconRefresh from '@/icons/refresh'

  export default {
    name: 'Calendar',

    components: {
      EventDay,
      iconRefresh
    },

    data () {
      return {
        isShow: false
      }
    },

    mounted () {
      // if (this.$store.getters.allowNotification) {
      //   this.checkEvents()
      //   setInterval(() => {
      //     this.checkEvents()
      //   }, 1800000) // 30 minute
      // }
    },

    computed: {
      hasCalenderItem () {
        return this.$store.getters.hasCalenderItem
      },
      calendarItems () {
        return this.$store.state.calendarItems
      },
      eventsSortAndGroupBy () {
        return this.$store.getters.eventsSortAndGroupBy
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
      },

      refresh () {
        this.$store.dispatch('getEventList')
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

    .loginWithGoogle {
      margin-left: 30px;
      border-radius: var(--border-radius);
      color: white;
      background-color: var(--color-calander);
    }

  }
</style>
