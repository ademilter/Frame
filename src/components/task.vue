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
      textarea.text(
      v-if="isEdit"
      v-model="text")
      // normal
      span.text(
      v-if="!isEdit"
      @click="isEdit = true")
        | {{ text }}
      button.remove(
      v-if="!isEdit"
      type="button"
      @click="remove") Sil
</template>

<script>
  import iconDrag from './icon-drag'
  import iconCheck from './icon-check'

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
      iconCheck
    },

    data () {
      return {
        isEdit: false
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
      background-color: #EEE;
    }

    .handle {
      transition: var(--transition);
      color: var(--color-lighter);
      transform: translateX(-100%);
      opacity: 0;
      position: absolute;
      left: 0;
      top: 5px;
    }

    &-checkbox {
      margin-top: 1px;
      transition: var(--transition);
      cursor: pointer;
      margin-right: 10px;
      flex-shrink: 0;
      position: relative;
      width: 22px;
      height: 22px;
      color: white;
      border: 1px solid var(--color-lighter);
      border-radius: 4px;

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
      margin-left: 10px;
      transition: var(--transition);
      opacity: 0;
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
