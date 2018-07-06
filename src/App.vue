<template lang="pug">
  .App
    .cols

      .col
        .add(@click="addNote") ekle
        Draggable(
        v-model="notes"
        :options="{ animation: 120, handle: '.handle' }")
          note(
          v-for="note in notes"
          :key="note.id"
          :note="note")

      .col
        .add(@click="addTodo") ekle
        Draggable(
        v-model="todos"
        :options="{ animation: 120, handle: '.handle' }")
          todo(
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo")

      .col asdsg asdasd
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import note from './components/note'
  import todo from './components/todo'
  import Draggable from 'vuedraggable'

  export default {
    name: 'App',

    components: {
      note,
      todo,
      Draggable
    },

    data () {
      return {}
    },

    computed: {
      notes: {
        get () {
          return this.$store.getters.notes
        },
        set (value) {
          this.$store.commit('updateNotes', value)
        }
      },
      todos: {
        get () {
          return this.$store.getters.todos
        },
        set (value) {
          this.$store.commit('updateTodos', value)
        }
      }
    },

    methods: {
      addNote () {
        this.$store.commit('addNote')
      },
      addTodo () {
        this.$store.commit('addTodo')
      }
    }
  }
</script>

<style>
  :root {
    --br: 4px;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
  }

  .App {
    font: 16px/1.5 Arial;
    position: fixed;
    overflow: hidden;
    size: 100vw;
    height: 100vh;
    color: #333;
    background-color: #FFF;
  }

  .cols {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));
  }

  .col {
    padding: 20px;
    border: 1px solid #DDD;
  }

  .note {
    border-top: 1px solid #DDD;

    .ql-editor {
      padding-left: 0;
      padding-right: 0;
    }

    .ql-editor.ql-blank::before {
      left: 0;
      font-style: normal;
      right: 0;
    }
  }
</style>
