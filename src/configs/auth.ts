export default {
  meEndpoint: '/API/auth/info',
  loginEndpoint: '/API/auth/login',
  registerEndpoint: '/API/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
