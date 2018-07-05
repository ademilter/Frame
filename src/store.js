import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deneme: 0
  },
  getters: {
    deneme: state => state.deneme
  },
  mutations: {
    change: state => state.deneme++
  },
  actions: {},
  plugins: [createPersistedState()]
})
