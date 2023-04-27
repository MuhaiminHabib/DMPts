import axiosConfig from './axios'

export default {
  meEndpoint: '/auth/info',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
