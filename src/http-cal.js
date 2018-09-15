import axios from 'axios'

const httpCal = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3/'
})

export default httpCal
