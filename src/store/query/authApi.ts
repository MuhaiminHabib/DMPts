import { baseApi } from './baseApi'

type AuthResponse = {
  accessToken: string
  refreshToken: string
  userId: string
}

type LoginInputs = {
  username: string
  password: string
}
type ChangePasswordInputs = {
  currentPassword: string
  newPassword: string
  newPasswordVerify: string
}

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<AuthResponse, LoginInputs>({
      query: (body: LoginInputs) => ({
        url: `/API/auth/login`,
        method: 'POST',
        body: body
      })
    }),
    changePassword: build.mutation<any, ChangePasswordInputs>({
      query: (body: ChangePasswordInputs) => ({
        url: `/API/auth/change-password`,
        method: 'POST',
        body: body
      })
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/API/auth/logout`,
        method: 'GET'
      })
    }),
    meEndpoint: build.mutation<void, void>({
      query: () => ({
        url: '/API/auth/info',
        method: 'GET'
      })
    })
  }),
  overrideExisting: false
})

export const { useLoginMutation, useChangePasswordMutation, useLogoutMutation, useMeEndpointMutation } = authApi
