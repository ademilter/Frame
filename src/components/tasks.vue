<template lang="pug">
  .Column.Tasks

    .Column-header
      h3.title TASK
      button(
      class="btn --small new"
      type="button"
      @click="addTask")
        iconPlus
        span New

    .Column-body(ref="scrollParent")
      VuePerfectScrollbar(
      class="scroll-area"
      v-if="isShow"
      tagname="div"
      ref="ps")

        .content(ref="content")

          .active-tasks

            //.empty-state(
              v-if="!hasActiveTasks")
                | Çiçek gibi, yapılacak iş yok!

            Draggable(
            v-if="hasActiveTasks"
            v-model="tasks"
            ref="activeTasks"
            @start="onDragStart"
            @end="onDragEnd"
            :options="{ animation: 120, handle: '.handle' }")

              task(
              v-for="task in tasks"
              :key="task.id"
              v-if="!task.status"
              @onScrollUpdate="scrollUpdate"
              :class="{ 'completed' : task.status }"
              :task="task")

          .completed-tasks

            //.empty-state(
              v-if="!hasCompletedTasks")
                | Çiçek gibi, yapılacak iş yok!

            task(
            v-for="task in tasks"
            :key="task.id"
            v-if="task.status"
            @onScrollUpdate="scrollUpdate"
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

      window.addEventListener('resize', this.scrollUpdate)
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.scrollUpdate)
    },

    computed: {
      hasActiveTasks () {
        return this.$store.getters.hasActiveTasks
      },
      hasCompletedTasks () {
        return this.$store.getters.hasCompletedTasks
      },
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
        this.$nextTick().then(() => {
          const lastTask = this.$refs.activeTasks.$children.pop()
          lastTask.isEdit = true
        })
      },
      scrollUpdate () {
        this.$refs.ps.update()
      },
      onDragStart () {
        this.$refs.content.classList.add('drag-start')
      },
      onDragEnd () {
        this.$refs.content.classList.remove('drag-start')
      }
    }

  }
</script>

<style>
  .Column.Tasks {

    .Column-header {
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
        padding-top: 4px;
        padding-bottom: 4px;

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

        .remove {
          margin-top: -2px;
        }
      }
    }

  }
</style>
