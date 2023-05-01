import { UsersType } from 'src/types/apps/userTypes'
import { baseApi } from './baseApi'

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchBaList: build.query<UsersType[], void>({
      query: () => '/auth/ba-list'
    })
  }),
  overrideExisting: false
})

export const { useFetchBaListQuery } = userApi
