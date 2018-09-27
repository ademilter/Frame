<template lang="pug">
  header.Header
    .what-time-is
      .time {{ time }}
      .date {{ date }}
</template>

<script>
  export default {
    name: 'Header',

    data () {
      return {
        time: null,
        date: null
      }
    },

    created () {
      this.setTime()
      setInterval(this.setTime, 1000)
    },

    methods: {
      setTime () {
        this.time = this.$moment().format('HH:mm')
        this.date = this.$moment().format('D MMMM YYYY, dddd')
      }
    }

  }
</script>

<style>
  .Header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    flex-shrink: 0;

    .what-time-is {
      margin-right: 30px;
      margin-left: auto;
      text-align: right;
      line-height: 1;

      .time {
        font-weight: bold;
        font-size: 45px;
      }

      .date {
        margin-top: 5px;
        font-size: 20px;
      }
    }
  }
</style>
