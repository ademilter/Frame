<template lang="pug">
  .Event
    h4
      | {{ event.summary }}
    p
      small {{ event.location }}
    p
      small {{ time }}

</template>

<script>
  export default {
    name: 'event',
    props: [
      'event'
    ],
    computed: {
      time () {
        const startDate = this.$moment(this.event.start.date || this.event.start.dateTime)
        const endDate = this.$moment(this.event.end.date || this.event.end.dateTime)
        const isEqual = startDate.isSame(endDate, 'day')
        return isEqual
          ? startDate.format('HH:mm') + ' - ' + endDate.format('HH:mm')
          : 'Tüm Gün'
      }
    }
  }
</script>

<style scoped>
  .event-day {
    vertical-align: top;
    & + & {
      td {
        border-top: 1px solid var(--border-line-color);
      }
    }

    td {
      padding-top: 15px;
      padding-bottom: 15px;

      &.event-date {
        padding-right: 20px;
        white-space: nowrap;
      }
    }
  }
</style>
