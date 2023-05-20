import { UsersType } from 'src/types/apps/userTypes'
import { baseApi } from './baseApi'

type StatusResponse = {
  count: string
}

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    //Admin
    baCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/total-of-ba',
      providesTags: [{ type: 'User', id: 'BA' }]
    }),

    //BA
    dmCountForBa: build.query<StatusResponse, void>({
      query: () => '/API/auth/auth/ba-get-total-of-dm',
      providesTags: [{ type: 'User', id: 'DM' }]
    }),
    cCountForBa: build.query<StatusResponse, void>({
      query: () => '/API/auth/total-of-c',
      providesTags: [{ type: 'User', id: 'C' }]
    }),
    cmCountForBa: build.query<StatusResponse, void>({
      query: () => '/API/auth/ba-gets-total-of-cm',
      providesTags: [{ type: 'User', id: 'CM' }]
    }),
    postCountForBa: build.query<StatusResponse, void>({
      query: () => '/API/posting/ba-get-total-of-posts',
      providesTags: ['Post']
    }),

    //DM
    cCountforDm: build.query<StatusResponse, void>({
      query: () => '/API/auth/dm-gets-total-of-c',
      providesTags: [{ type: 'User', id: 'C' }]
    }),
    postCountforDm: build.query<StatusResponse, void>({
      query: () => '/API/posting/dm-get-total-of-posts',
      providesTags: ['Post']
    }),

    //C
    cmCountforC: build.query<StatusResponse, void>({
      query: () => '/API/auth/c-gets-total-of-cm',
      providesTags: [{ type: 'User', id: 'CM' }]
    }),
    postCountforC: build.query<StatusResponse, void>({
      query: () => '/API/posting/c-get-total-of-posts',
      providesTags: ['Post']
    })
  }),
  overrideExisting: false
})

export const {
  useBaCountQuery,
  useDmCountForBaQuery,
  useCCountForBaQuery,
  useCmCountForBaQuery,
  usePostCountForBaQuery,
  useCCountforDmQuery,
  usePostCountforDmQuery,
  usePostCountforCQuery,
  useCmCountforCQuery
} = userApi
