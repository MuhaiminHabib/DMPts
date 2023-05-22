import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { baseURL } from 'src/utils/constants'
import authConfig from 'src/configs/auth'

// type RefreshResultData = {
//   accesstoken: string
//   refreshtoken: string
// }

// type RefreshResultType = {
//   data: RefreshResultData | undefined
//   error: FetchBaseQueryError
//   meta: FetchBaseQueryMeta
// }

// const [logout] = useLogoutMutation()

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: headers => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      headers.set('accessToken', accessToken)
    }

    return headers
  }
})
const baseQueryForAccessToken = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: headers => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshtoken = localStorage.getItem('refreshToken')
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
    const refreshResult: any = await baseQueryForAccessToken('/API/auth/get-access-token', api, extraOptions)
    if (refreshResult.data) {
      console.log('refresh result is:', refreshResult.data)
      console.log('refresh result accessToken:', refreshResult.data.accesstoken)
      console.log('refresh result refreshToken:', refreshResult.data.refreshtoken)
      localStorage.setItem(authConfig.storageTokenKeyName, refreshResult.data.accesstoken)
      localStorage.setItem(authConfig.onTokenExpiration, refreshResult.data.refreshtoken)

      // retry the initial query

      result = await baseQuery(args, api, extraOptions)
    } else {
      //logout needed here
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      window.location.replace('/login')
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
