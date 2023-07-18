import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { baseURL } from 'src/utils/constants'
import authConfig from 'src/configs/auth'
import { showErrorAlert } from 'src/utils/swal'

let isRefreshing = false
let failedQueue: Array<{ resolve: (value: string | PromiseLike<string>) => void; reject: (reason?: any) => void }> = []

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token as string)
    }
  })

  failedQueue = []
}

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

  if (result.error && result.error.status === 401) {
    const originalRequest = args

    if (!isRefreshing) {
      isRefreshing = true

      try {
        const refreshResult: any = await baseQueryForAccessToken('/API/auth/get-access-token', api, extraOptions)
        localStorage.setItem(authConfig.storageTokenKeyName, refreshResult.data.accesstoken)
        localStorage.setItem(authConfig.onTokenExpiration, refreshResult.data.refreshtoken)
        isRefreshing = false
        processQueue(null, refreshResult.data.accesstoken)
        result = await baseQuery(args, api, extraOptions)
      } catch (e) {
        processQueue(e, null)
        const error = e as FetchBaseQueryError
        showErrorAlert({ error: error })
        await baseQuery('/API/auth/logout', api, extraOptions)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        window.location.replace('/login')
      }
    } else {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then(token => {
          if (typeof originalRequest === 'object') {
            originalRequest.headers = { ...originalRequest.headers, accesstoken: `${token}` }

            return baseQuery(originalRequest, api, extraOptions)
          } else {
            throw new Error('originalRequest is not an object')
          }
        })
        .catch(err => {
          return { error: err }
        })
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
