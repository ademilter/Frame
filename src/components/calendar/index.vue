<template lang="pug">
  .Column.Calendar

    .Column-header
      h3.title CALENDAR

    .Column-body(ref="scrollParent")
      VuePerfectScrollbar(
      class="scroll-area"
      v-if="isShow"
      tagname="div"
      ref="ps")

        .content(ref="content")

          table.event-group
            tr(
            v-for="(events, key) in eventsByDateGroup"
            :key="key")

              td.event-date
                p
                  | {{ $moment(key).format('dddd') }}
                p
                  small {{ $moment(key).format('D MMMM YYYY') }}

              td.event-list
                div.Event(
                v-for="event in events"
                :key="event.id")
                  h4 {{ event.summary }}
                  p
                    small {{ event.location }}
                  p
                    small {{ event.time }}

</template>

<script>
  import iconPlus from '@/icons/plus'

  export default {
    name: 'Calendar',

    components: {
      iconPlus
    },
    created () {
      // .note
      // Başlangıçta saating 1 saniye gecikmeli gelmesini engellemek adına eklenmiş iki satır.
      this.time = this.$moment().format('HH:mm')
      this.date = this.$moment().format('dddd, D MMMM YYYY')

      setInterval(() => {
        this.time = this.$moment().format('HH:mm')
        this.date = this.$moment().format('dddd, D MMMM YYYY')

        this.Notification()
      }, 60000)
    },

    data () {
      return {
        isShow: false
      }
    },

    mounted () {
      const h = this.$refs.scrollParent.clientHeight
      this.$refs.scrollParent.style.height = `${h}px`
      this.isShow = true

      window.addEventListener('resize', this.scrollUpdate)
    },

    computed: {
      eventsByDateGroup () {
        return this.$store.getters.eventsByDateGroup
      }
    },

    methods: {
      scrollUpdate () {
        this.$refs.ps.update()
      },

      /* global chrome */
      Notification () {
        const result = this.eventsByDateGroup

        for (const anEvent in result) {
          if (this.$moment(anEvent).format('dddd, D MMMM YYYY') === this.date) {
            if (this.$moment(anEvent).fromNow() === '30 dakika sonra') {
              chrome.notifications.create(null, {
                'type': 'basic',
                'iconUrl': 'icon-48.png',
                'title': 'Yaklaşan etkinlik',
                'message': result[anEvent][0].summary + ' \n 30 dakika sonra'
              })
            }
          }
        }
      }
    }
  }
</script>

<style>
  .Column.Calendar {

    .event-group {
      margin-top: -10px;
      margin-left: 30px;
      margin-right: 30px;

      tr {
        vertical-align: top;

        + tr {
          td {
            border-top: 1px solid var(--border-line-color);
          }
        }
      }

      td {
        padding-top: 15px;
        padding-bottom: 15px;

        &.event-date {
          padding-right: 20px;
        }
      }
    }
  }
</style>
