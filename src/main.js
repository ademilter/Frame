import Vue from 'vue'
import App from './App'
import store from './store'
import moment from 'moment'
import 'moment/locale/tr'
import getAuthToken from './utils/get-token'

import Draggable from 'vuedraggable'
import VueQuillEditor from 'vue-quill-editor'

Vue.component('Draggable', Draggable)
Vue.use(VueQuillEditor, {})

Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

if (store.getters.hasToken) {
  store.commit('setToken', store.state.token)
  if (store.getters.calendarDataExpire) {
    store.dispatch('getEventList')
  }
}

if (store.state.notification === 'default') {
  Notification.requestPermission(function (permission) {
    store.commit('changeNotification', permission)
  })
}

if (process.env.NODE_ENV === 'development') {
  store.commit('calSetDummyData')
}
