<template lang="pug">
  .event-day(:class="{ 'today' : isToday }")

    .event-date
      h4
        | {{ $moment(date).format('dddd') }}
      p
        small {{ $moment(date).format('D MMMM YYYY') }}
      p.today(v-if="isToday")
        small Bugün

    .event-list
      Event(
      v-for="event in events"
      :key="event.id"
      :event="event")

</template>

<script>
  import Event from './event'

  export default {
    name: 'event-day',
    props: [
      'date',
      'events'
    ],
    components: {
      Event
    },
    computed: {
      isToday () {
        return this.$moment().isSame(this.$moment(this.date), 'day')
      }
    }
  }
</script>

<style scoped>
  .event-day {
    position: relative;
    padding: 20px 30px;
    display: flex;

    &:not(.today) + & {
      &:before {
        content: "";
        position: absolute;
        left: 30px;
        right: 30px;
        top: 0;
        height: 1px;
        background-color: var(--border-line-color);
      }
    }

    &.today {
      background-color: rgba(255, 0, 0, .04);
    }

  }

  p.today {
    color: var(--color-calander)
  }

  .event-date {
    flex-shrink: 0;
    width: 120px;
    white-space: nowrap;
  }

  .event-list {
  }
</style>
