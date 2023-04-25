import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.1.35/API'
// axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers.common['DMPToken'] = localStorage.getItem('DMPToken')
// axios.defaults.withCredentials = true

const axiosConfig = axios.create({
  baseURL: 'http://192.168.1.35/API',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

axiosConfig.interceptors.request.use(
  config => {
    const DMPToken = localStorage.getItem('DMPToken')
    config.headers.DMPToken = `${DMPToken}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosConfig
