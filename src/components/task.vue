<template lang="pug">
  .task

    button.handle(
    type="button")
      icon-drag

    // checkbox
    label.task-checkbox(
    :class="{ 'check' : status }")
      icon-check
      input(
      type="checkbox"
      v-model="status")

    .task-text

      // edit
      autosize(
      ref="autosize"
      rows="1"
      @blur="isEdit = false"
      @enter="isEdit = false"
      v-if="isEdit"
      v-model="text")

      // normal
      span.text(
      v-if="!isEdit"
      @click="isEdit = true")
        | {{ text }}
        span.remove(
        v-if="!isEdit"
        @click="remove")
          iconRemove
</template>

<script>
  import iconDrag from './icon-drag'
  import iconCheck from './icon-check'
  import iconRemove from './icon-remove'
  import autosize from './autosize'

  export default {
    name: 'Task',

    props: {
      task: {
        required: true,
        type: Object
      }
    },

    components: {
      iconDrag,
      iconCheck,
      iconRemove,
      autosize
    },

    data () {
      return {
        isEdit: false,
        textt: ''
      }
    },

    watch: {
      isEdit (value) {
        if (!value) return
        this.$nextTick().then(() => {
          this.$refs.autosize.$el.focus()
        })
      }
    },

    computed: {
      text: {
        get () {
          return this.task.text
        },
        set (value) {
          this.$store.commit('changeTextTask', {
            task: this.task,
            text: value
          })
        }
      },
      status: {
        get () {
          return this.task.status
        },
        set (value) {
          this.$store.commit('changeStatusTask', {
            task: this.task,
            status: value
          })
        }
      }
    },

    methods: {
      remove () {
        this.$store.commit('removeTasks', this.task)
      }
    }
  }
</script>

<style>
  .task {
    padding: 5px 30px;
    position: relative;
    display: flex;
    align-items: flex-start;

    & + & {

    }

    &.sortable-chosen {
    }

    &.sortable-ghost {
      background-color: #EEFAFD;
    }

    .handle {
      transition: var(--transition);
      color: var(--color-lighter);
      transform: translateX(-100%);
      opacity: 0;
      position: absolute;
      left: 0;
      top: 4px;
      cursor: ns-resize;
    }

    &-checkbox {
      margin-top: 1px;
      transition: var(--transition);
      cursor: pointer;
      margin-right: 10px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      position: relative;
      width: 22px;
      height: 22px;
      color: white;
      border: 1px solid var(--color-lighter);
      border-radius: var(--border-radius);

      &:hover {
        background-color: var(--color-shadow);
      }

      .icon {
        transition: var(--transition);
        opacity: 0;
        width: 100%;
        height: 100%;
      }

      &.check {
        background-color: var(--color-task);

        .icon {
          opacity: 1;
        }
      }

      input {
        position: absolute;
        pointer-events: none;
        opacity: 0;
      }
    }

    &-text {
      flex-grow: 1;

      textarea {
        display: block;
        width: 100%;
      }
    }

    .remove {
      cursor: pointer;
      margin-left: 8px;
      opacity: 0;
      padding: 3px 5px;
      border-radius: var(--border-radius);
      transition: var(--transition);

      &:hover {
        background-color: var(--color-shadow);
      }

      .icon {
        width: 16px;
        height: 16px;
      }
    }

    &:hover {
      .handle {
        opacity: 1;
        transform: translateX(0);
      }
      .remove {
        opacity: 1;
      }
    }

  }
</style>
