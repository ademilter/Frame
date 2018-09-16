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
      setInterval(() => {
        this.time = this.$moment().format('HH:mm')
        this.date = this.$moment().format('dddd, D MMMM YYYY')
      })
    }

  }
</script>

<style>
  .Header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .what-time-is {
      margin-right: 30px;
      margin-left: auto;
      text-align: right;
      line-height: 1;

      .time {
        font-weight: bold;
        font-size: 50px;
      }

      .date {
        font-size: 20px;
      }
    }
  }
</style>
