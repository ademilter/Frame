import Vue from 'vue'
import App from './App.vue'
import store from './store'
import moment from 'moment'
import 'moment/locale/tr'

import Draggable from 'vuedraggable'
import VueQuillEditor from 'vue-quill-editor'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

Vue.component('Draggable', Draggable)
Vue.component('VuePerfectScrollbar', VuePerfectScrollbar)
Vue.use(VueQuillEditor, {})

Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

/* eslint-disable no-undef */
window.onload = function () {
  chrome.identity.getAuthToken(
    { interactive: true },
    async function (token) {
      store.commit('calSetToken', token, { root: true })
      store.dispatch('getEventList')
    }
  )
}
