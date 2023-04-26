import axiosConfig from './axios'

export default {
  meEndpoint: '/auth/info',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'DMPToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
