import Vue from 'vue'
import Vuex from 'vuex'
// import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'
import { Note, Task } from './model'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    tasks: [],
    editorOption: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['clean']
        ]
      },
      placeholder: 'New note...',
      theme: 'bubble'
    }
  },

  getters: {
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
    removeNote (state, note) {
      state.notes.splice(state.notes.indexOf(note), 1)
    },
    updateTasks (state, newList) {
      state.tasks = newList
    },
    addTask (state) {
      state.tasks.unshift(new Task())
    },
    changeTextTask (state, { task, text }) {
      task.text = text
    },
    changeStatusTask (state, { task, status }) {
      task.status = status
    },
    removeTasks (state, task) {
      state.tasks.splice(state.tasks.indexOf(task), 1)
    }
  },

  plugins: [createPersistedState()]
})
