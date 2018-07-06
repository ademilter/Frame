<template lang="pug">
  .todo
    div.handle #
    label.status
    input.check(
    type="checkbox"
    v-model="status")
    input.text(
    type="text"
    v-model="text")
</template>

<script>
  export default {
    name: 'Note',

    props: {
      todo: {
        required: true,
        type: Object
      }
    },

    computed: {
      text: {
        get () {
          return this.todo.text
        },
        set (value) {
          this.$store.commit('changeTextTodo', {
            todo: this.todo,
            text: value
          })
        }
      },
      status: {
        get () {
          return this.todo.status
        },
        set (value) {
          this.$store.commit('changeStatusTodo', {
            todo: this.todo,
            status: value
          })
        }
      }
    },

    methods: {
      onEditorChange ({ quill, html }) {
        this.$store.commit('changeNote', {
          note: this.note,
          content: html
        })
      }
    }
  }
</script>

<style scoped>
  .todo {
    display: flex;
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: white;
    border-radius: var(--br);

    &.sortable-chosen {
    }

    &.sortable-ghost {
      background-color: #eee;
    }

    .status {
      margin-left: 5px;
      flex-shrink: 0;
    }

    .check {
      margin-top: 6px;
    }

    .text {
      padding-top: 5px;
      padding-bottom: 5px;
      margin-left: 10px;
      flex-grow: 1;
      width: 100%;
      background-color: transparent;
    }
  }
</style>
