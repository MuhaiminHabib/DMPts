import axiosConfig from 'src/configs/axios'
// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { baseURL } from './constants'

export const getRefreshToken = async () => {
  console.log('i will try to refresh the access token')
  try {
    const response = await axios.get('/auth/get-access-token', {
      headers: {
        refreshtoken: localStorage.getItem(authConfig.onTokenExpiration)
      },
      withCredentials: true,
      baseURL: baseURL
    })
    // Store new access token and refresh token in local storage
    localStorage.setItem(authConfig.storageTokenKeyName, response.data.accesstoken)
    localStorage.setItem(authConfig.onTokenExpiration, response.data.refreshtoken)
    return response.data.accesstoken
  } catch (error) {
    console.log('Error refreshing token', error)
    throw error
  }
}

// export const handleLogoutApi = () => {
//     const res
// }
