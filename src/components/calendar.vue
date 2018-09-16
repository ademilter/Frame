<template lang="pug">
  .Column.Calendar

    .Column-header
      h3.title CALENDAR
      a(
      class="btn --small new"
      href="")
        iconPlus
        span New

    .Column-body(ref="scrollParent")
      VuePerfectScrollbar(
      class="scroll-area"
      v-if="isShow"
      tagname="div"
      ref="ps")

        .content(ref="content")
</template>

<script>
  import task from './task'
  import iconPlus from './icon-plus'

  export default {
    name: 'Calendar',

    components: {
      task,
      iconPlus
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

    beforeDestroy () {
      window.removeEventListener('resize', this.scrollUpdate)
    },

    methods: {
      scrollUpdate () {
        this.$refs.ps.update()
      }
    }

  }
</script>

<style>
  .Column.Calendar {
    .Column-header {
      .new {
        background-color: var(--color-task);
      }
    }
  }
</style>
