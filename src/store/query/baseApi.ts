import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import { baseURL } from 'src/utils/constants'
import authConfig from 'src/configs/auth'
import { useLogoutQuery } from './userApi'
import { logOutUser } from '../apps/user'
import type { UsersType as User } from 'src/types/apps/userTypes'
import type { PostsTypes as Post } from 'src/types/apps/postTypes'
type RefreshResultData = {
  accesstoken: string
  refreshtoken: string
}

type RefreshResultType = {
  data?: RefreshResultData | undefined
  error?: FetchBaseQueryError
  meta?: FetchBaseQueryMeta
}

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: headers => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshtoken = localStorage.getItem('refreshToken')
    // console.log('accessToken is:', accessToken)
    console.log('refreshToken is:', refreshtoken)
    if (accessToken && refreshtoken) {
      headers.set('accessToken', accessToken)
      headers.set('refreshtoken', refreshtoken)
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  console.log('result is:', result)
  if (result.error && result.error.status === 401) {
    console.log('in 401')
    const refreshResult: RefreshResultType = await baseQuery('/API/auth/get-access-token', api, extraOptions)
    if (refreshResult.data) {
      console.log('refresh result is:', refreshResult.data)
      console.log('refresh result accessToken:', refreshResult.data.accesstoken)
      console.log('refresh result refreshToken:', refreshResult.data.refreshtoken)
      // api.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }))
      localStorage.setItem(authConfig.storageTokenKeyName, refreshResult.data.accesstoken)
      localStorage.setItem(authConfig.onTokenExpiration, refreshResult.data.refreshtoken)

      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOutUser())
      // useLogoutQuery()
      // window.localStorage.removeItem('userData')
      // window.localStorage.removeItem(authConfig.storageTokenKeyName)
      // window.location.replace('/login')
    }
  }
  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post', 'User'],
  endpoints: () => ({})
})
