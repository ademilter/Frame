import Vue from 'vue'
import App from './App'
import store from './store'
import moment from 'moment'
import 'moment/locale/tr'
// import getAuthToken from './utils/get-token'

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

if (process.env.NODE_ENV === 'development') {
  store.commit('calSetDummyData')
}

if (store.state.notification === 'default') {
  Notification.requestPermission(function (permission) {
    console.log(permission)
    store.commit('changeNotification', permission)
  })
}
