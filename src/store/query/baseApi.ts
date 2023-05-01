// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { baseURL } from 'src/utils/constants'

// // initialize an empty api service that we'll inject endpoints into later as needed
// export const baseApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseURL,
//     prepareHeaders: (headers) => {
//         const accessToken = localStorage.getItem('accessToken')
//         // If we have a token set in state, let's assume that we should be passing it.
//         if (accessToken) {
//           headers.set('accessToken', accessToken)
//         }
//         return headers
//  },
//   endpoints: () => ({})
// })

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from 'src/utils/constants'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

// initialize an empty api service that we'll inject endpoints into later as needed

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: 'include',
  prepareHeaders: headers => {
    const accessToken = localStorage.getItem('accessToken')
    console.log('accessToken is:', accessToken)
    if (accessToken) {
      headers.set('accessToken', accessToken)
    }
    return headers
  }
})

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
    prepareHeaders: headers => {
      const accessToken = localStorage.getItem('accessToken')
      console.log('accessToken is:', accessToken)
      if (accessToken) {
        headers.set('accessToken', accessToken)
      }
      return headers
    }
  }),
  endpoints: () => ({})
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(loggedOut())
    }
  }
  return result
}
