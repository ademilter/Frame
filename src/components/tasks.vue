<template lang="pug">
  .col.tasks

    .col-header
      h3.title TASKS
      button(
      class="btn --small new"
      type="button"
      @click="addTask")
        iconPlus
        span New

    .col-body(ref="scrollParent")
      VuePerfectScrollbar(
      class="scroll-area"
      v-if="isShow"
      tagname="div"
      ref="ps")

        .content(ref="content")
          .empty-state(
          v-if="!tasks.length")
            | Çiçek gibi, yapılacak iş yok!

          Draggable.active-tasks(
          v-if="tasks.length"
          v-model="tasks"
          @start="onDragStart"
          @end="onDragEnd"
          :options="{ animation: 120, handle: '.handle' }")

            task(
            v-for="task in tasks"
            :key="task.id"
            v-if="!task.status"
            :class="{ 'completed' : task.status }"
            :task="task")

          .completed-tasks
            task(
            v-for="task in tasks"
            :key="task.id"
            v-if="task.status"
            :class="{ 'completed' : task.status }"
            :task="task")
</template>

<script>
  import task from './task'
  import iconPlus from './icon-plus'

  export default {
    name: 'Tasks',

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
    },

    computed: {
      tasks: {
        get () {
          return this.$store.state.tasks
        },
        set (value) {
          this.$store.commit('updateTasks', value)
          this.scrollUpdate()
        }
      }
    },

    methods: {
      addTask () {
        this.$store.commit('addTask')
        this.scrollUpdate()
      },
      scrollUpdate () {
        this.$refs.ps.update()
      },
      onDragStart (el) {
        this.$refs.content.classList.add('drag-start')
      },
      onDragEnd (el) {
        this.$refs.content.classList.remove('drag-start')
      }
    }
  }
</script>

<style>
  .col.tasks {

    .col-header {
      .new {
        background-color: var(--color-task);
      }
    }

    .content.drag-start {
      .handle,
      .remove {
        display: none;
      }
    }

    .active-tasks {
    }

    .completed-tasks {
      margin-top: 20px;

      &:before {
        content: "";
        display: block;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 20px;
        height: var(--border-line-height);
        background-color: var(--border-line-color);
      }

      .task {

        .handle {
          display: none;
        }

        &-checkbox {
          margin-left: 4px;
          width: 18px;
          height: 18px;
          .icon {
            transform: translateY(-1px);
          }
        }
        &-text {
          color: var(--color-light);
          font-size: var(--font-size-small);
        }
      }
    }

  }
</style>
