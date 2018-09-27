import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import httpCalendar from '../utils/http-calendar'
import moment from 'moment'
import { Note, Task } from '../model'
import { dummyCalendarList, dummyCalendarItems } from './dummy-data'

Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [createPersistedState({
    key: 'FrameExtension'
  })],

  state: {
    // data
    notes: [],
    tasks: [],
    calendarList: [],
    calendarItems: [],
    // config
    token: null,
    notification: 'default',
    calendarLastUpdate: moment().startOf('hour')
  },

  getters: {
    hasToken: state => state.token !== null,
    calendarDataExpire: state => {
      return moment().startOf('hour').format('H') - moment(state.calendarLastUpdate).format('H') > 0
    },
    allowNotification: state => state.notification === 'granted',
    hasNote: state => !!state.notes.length,
    hasActiveTasks: state => state.tasks.some(o => !o.status),
    hasCompletedTasks: state => state.tasks.some(o => o.status),
    eventsSortAndGroupBy: state => {
      const sortDates = {}
      // groupBy
      const groupBy = state.calendarItems.reduce((acc, obj) => {
        const key = moment(obj.start.date || obj.start.dateTime).format('YYYY-MM-DD');
        (acc[key] || (acc[key] = [])).push(obj)
        return acc
      }, {})
      // sort by timestamp and move new object
      Object.keys(groupBy).sort((a, b) => {
        return moment(a).format('X') - moment(b).format('X')
      }).forEach(key => {
        sortDates[key] = groupBy[key]
      })
      return sortDates
    }
  },

  actions: {

    afterLogin ({ commit, dispatch }, token) {
      commit('changeToken', token)
      commit('setToken', token)
      dispatch('getEventList')
    },

    async getCalendarList ({ commit }) {
      const response = await httpCalendar.get('users/me/calendarList')
      commit('setCalendarList', response.data)
    },

    async getEventList ({ state, getters, dispatch, commit }) {
      await dispatch('getCalendarList')

      const fromDate = moment()
      const toDate = moment().add(14, 'days')

      const requestList = state.calendarList.map(cal => {
        const url = [
          'calendars/',
          encodeURIComponent(cal.id),
          '/events',
          '?timeMin=' + encodeURIComponent(fromDate.toISOString()),
          '&timeMax=' + encodeURIComponent(toDate.toISOString()),
          '&maxResults=50',
          '&orderBy=startTime',
          '&singleEvents=true'
        ].join('')
        return httpCalendar.get(url)
      })

      const response = await Promise.all(requestList)
      commit('setCalendarItems', response)
      commit('updateCalendarLastUpdate')
    }

  },

  mutations: {

    changeToken (state, token) {
      state.token = token
    },

    setToken (state, token) {
      httpCalendar.defaults.headers.common.Authorization = `Bearer ${token}`
    },

    changeNotification (state, status) {
      state.notification = status
    },

    updateCalendarLastUpdate (state) {
      state.calendarLastUpdate = moment().startOf('hour')
    },

    moveOldData (state) {
      const oldData = JSON.parse(localStorage.getItem('vuex'))
      localStorage.removeItem('vuex')
      state.notes = oldData.notes
      state.tasks = oldData.tasks
    },

    // NOTE

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

    // TASK

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

    // CALENDAR

    calSetDummyData (state) {
      state.calendarList = dummyCalendarList()
      state.calendarItems = dummyCalendarItems()
    },

    setCalendarList (state, data) {
      state.calendarList = data.items
    },

    setCalendarItems (state, items) {
      const data = items.map(item => item.data)
      const events = data.map(calendar => calendar.items)
      state.calendarItems = events.flat()
    }
  }

})
