import axios from 'axios'
import { getRefreshToken } from 'src/utils/apiCalls'
import { baseURL } from 'src/utils/constants'

const axiosConfig = axios.create({
  // baseURL: 'http://192.168.110.16:3030/API',
  baseURL: baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

axiosConfig.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    config.headers.accessToken = accessToken
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosConfig.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    const refreshToken = localStorage.getItem('refreshToken')

    // Check if the error is a 401, the original request wasn't a token refresh, and a refresh token exists
    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true
      try {
        const newAccessToken = await getRefreshToken()
        console.log('i am out of error of api calls')
        originalRequest.headers.accesstoken = newAccessToken
        return axiosConfig(originalRequest) // Retry the original request with the new access token
      } catch (refreshError) {
        console.log('Error refreshing token', refreshError)
        // Log out the user if refreshing the token fails
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userData')
        window.location.replace('/login')
        // Redirect to the login page or handle the error in your application
      }
    }
    return Promise.reject(error)
  }
)

export default axiosConfig
