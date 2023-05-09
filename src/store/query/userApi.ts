import { UsersType } from 'src/types/apps/userTypes'
import { baseApi } from './baseApi'

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchBaList: build.query<UsersType[], void>({
      query: () => '/auth/ba-list'
    }),
    logout: build.query<void, void>({
      query: () => '/auth/logout'
    })
  }),
  overrideExisting: false
})

export const { useFetchBaListQuery, useLogoutQuery } = userApi
