import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { Note, Task } from './model'
import moment from 'moment'
import httpCal from './http-cal'

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

  actions: {
    async getEventList () {
      const calendarList = await httpCal.get('users/me/calendarList')
      console.log(calendarList)
      /*
      const id = calendarList.data.items[1].id
      const fromDate = moment()
      const toDate = moment().add(14, 'days')
      const url = [
        'calendars/',
        encodeURIComponent(id),
        '/events?',
        'timeMin=' + encodeURIComponent(fromDate.toISOString()),
        '&timeMax=' + encodeURIComponent(toDate.toISOString()),
        '&maxResults=50',
        '&orderBy=startTime',
        '&singleEvents=true'
      ].join('')
      const list = await httpCal.get(url)
      console.log(list)
      */
    }
  },

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
    },
    calSetToken (state, token) {
      httpCal.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },

  plugins: [createPersistedState()]
})
