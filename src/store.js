import Vue from 'vue'
import Vuex from 'vuex'
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
          ['code', 'clean']
        ]
      },
      placeholder: 'New note...',
      theme: 'bubble'
    }
  },

  getters: {
    hasActiveTasks: state => state.tasks.some(o => !o.status),
    hasCompletedTasks: state => state.tasks.some(o => o.status)
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
      const index = state.notes.indexOf(note)
      if (index > -1) {
        state.notes.splice(index, 1)
      }
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
      const index = state.tasks.indexOf(task)
      if (index > -1) {
        state.tasks.splice(index, 1)
      }
    }
  },

  plugins: [createPersistedState()]
})
