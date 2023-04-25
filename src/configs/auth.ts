export default {
  meEndpoint: 'http://192.168.1.35/API/auth/info',
  loginEndpoint: 'http://192.168.1.35/API/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'DMPToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
