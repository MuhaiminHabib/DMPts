import { baseApi } from './baseApi'

type StatusResponse = {
  count: string
}

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    cCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/get-total-of-c',
      providesTags: [{ type: 'User', id: 'C' }]
    }),

    //Admin
    baCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/total-of-ba',
      providesTags: [{ type: 'User', id: 'BA' }]
    }),
    dmCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/a-gets-total-of-dm',
      providesTags: [{ type: 'User', id: 'DM' }]
    }),
    cmCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/a-gets-total-of-cm',
      providesTags: [{ type: 'User', id: 'CM' }]
    }),
    postCount: build.query<StatusResponse, void>({
      query: () => '/API/posting/a-get-total-of-posts',
      providesTags: ['Post']
    }),

    //BA
    dmCountforBA: build.query<StatusResponse, void>({
      query: () => 'API/auth/ba-gets-total-of-dm',
      providesTags: [{ type: 'User', id: 'DM' }]
    }),

    cmCountforBA: build.query<StatusResponse, void>({
      query: () => '/API/auth/ba-gets-total-of-cm',
      providesTags: [{ type: 'User', id: 'CM' }]
    }),
    postCountforBA: build.query<StatusResponse, void>({
      query: () => '/API/posting/ba-get-total-of-posts',
      providesTags: ['Post']
    }),

    //DM
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
    }),

    //CM
    postCountforCm: build.query<StatusResponse, void>({
      query: () => '/API/posting/cm-gets-total-of-posts',
      providesTags: ['Post']
    })
  }),
  overrideExisting: false
})

export const {
  useCCountQuery,
  useBaCountQuery,
  useDmCountQuery,
  useCmCountQuery,
  usePostCountQuery,
  useDmCountforBAQuery,
  useCmCountforBAQuery,
  usePostCountforBAQuery,
  usePostCountforDmQuery,
  usePostCountforCQuery,
  useCmCountforCQuery,
  usePostCountforCmQuery
} = userApi
