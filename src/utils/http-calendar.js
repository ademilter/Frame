import axios from 'axios'

const httpCalendar = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3/'
})

export default httpCalendar
