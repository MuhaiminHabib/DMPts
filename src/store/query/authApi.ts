import { UsersType } from 'src/types/apps/userTypes'
import { baseApi } from './baseApi'

type AuthResponse = {
  accesstoken: string
  refreshtoken: string
  userId: string
}

type LoginInputs = {
  username: string
  password: string
}
type ForgotPasswordInputs = {
  username: string
  email: string
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
    forgotPassword: build.mutation<any, ForgotPasswordInputs>({
      query: (body: ForgotPasswordInputs) => ({
        url: `/API/auth/forget-password`,
        method: 'POST',
        body: body
      })
    }),
    meEndpoint: build.mutation<UsersType, void>({
      query: () => ({
        url: '/API/auth/info',
        method: 'GET'
      })
    }),
    getFbInfo: build.mutation<void, string>({
      query: token => ({
        url: `/API/fb-api/get-fb-info?token=${token}`,
        method: 'GET'
      })
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/API/auth/logout`,
        method: 'GET'
      }),
      invalidatesTags: ['User', 'Post']
    })
  }),
  overrideExisting: false
})

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useGetFbInfoMutation,
  useMeEndpointMutation
} = authApi
