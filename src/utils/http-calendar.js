import axios from 'axios'
import store from '../store'

const httpCalendar = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3/'
})

// Setting up an interceptor in case of a token
// expiration or unsuccessful authentication.

httpCalendar.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    console.error('token expired')
    if (store.getters.hasToken) {
      store.commit('changeToken', null)
    }
  }
  return Promise.reject(error)
})

export default httpCalendar
