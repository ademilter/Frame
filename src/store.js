import Vue from 'vue'
import Vuex from 'vuex'
// import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'

class Note {
  constructor (data = {}) {
    this.id = data.id || new Date().getTime()
    this.content = data.content || ''
  }
}

class Todo {
  constructor (data = {}) {
    this.id = data.id || new Date().getTime()
    this.status = data.text || false
    this.text = data.text || 'New todo'
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    editorOption: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['clean']
        ]
      },
      placeholder: 'Compose an epic...',
      theme: 'bubble'
    },
    todos: []
  },

  getters: {
    notes: state => state.notes,
    editorOption: state => state.editorOption,
    todos: state => state.todos
  },

  actions: {},

  mutations: {
    addNote (state) {
      state.notes.unshift(new Note())
    },
    changeNote (state, { note, content }) {
      note.content = content
    },
    updateNotes (state, newList) {
      state.notes = newList
    },
    updateTodos (state, newList) {
      state.todos = newList
    },
    addTodo (state) {
      state.todos.unshift(new Todo())
    },
    changeTextTodo (state, { todo, text }) {
      todo.text = text
    },
    changeStatusTodo (state, { todo, status }) {
      todo.status = status
    }
  },

  plugins: [createPersistedState()]
})
