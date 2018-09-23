<template lang="pug">
  tr.event-day(:class="{ 'today' : isToday }")

    td.event-date
      h4
        | {{ $moment(date).format('dddd') }}
      p
        small {{ $moment(date).format('D MMMM YYYY') }}

    td.event-list
      div.Event(
      v-for="event in events"
      :key="event.id")
        h4
          | {{ event.summary }}
        p
          small {{ event.location }}
        p
          small {{ event.time }}

</template>

<script>
  export default {
    name: 'event-day',
    props: [
      'date',
      'events'
    ],
    computed: {
      isToday () {
        return this.$moment().isSame(this.$moment(this.date), 'day')
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
