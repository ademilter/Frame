<template lang="pug">
  .event-item
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
  .event-item {
    & + & {
      margin-top: 20px;
    }
  }
</style>
