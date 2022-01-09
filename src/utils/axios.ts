import axios from 'axios'
import router from '../router/index'

// axios.defaults.baseURL = "http://116.63.152.202:8084"
// axios.defaults.baseURL = "http://192.168.43.112:8080"
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.push({ path: 'login' })
    }
    return Promise.reject(error.response.data)
  }
})

export default axios
