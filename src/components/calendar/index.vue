<template lang="pug">
  .Column

    .Column-header
      h3.title CALENDAR

    .Column-body

      .event-group(
      v-if="hasToken || $isDev")
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
