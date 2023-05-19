import { baseApi } from './baseApi'

type StatusResponse = {
  count: string
}

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    //Admin
    baCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/total-of-ba'
    }),

    //BA
    dmCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/auth/ba-get-total-of-dm'
    }),
    cCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/total-of-c'
    }),
    cmCount: build.query<StatusResponse, void>({
      query: () => '/API/auth/ba-gets-total-of-cm'
    }),
    postCount: build.query<StatusResponse, void>({
      query: () => '/API/posting/ba-get-total-of-posts'
    }),

    //DM
    cCountforDm: build.query<StatusResponse, void>({
      query: () => '/API/auth/dm-gets-total-of-c'
    }),
    postCountforDm: build.query<StatusResponse, void>({
      query: () => '/API/posting/dm-get-total-of-posts'
    }),

    //C
    cmCountforC: build.query<StatusResponse, void>({
      query: () => '/API/auth/c-gets-total-of-cm'
    }),
    postCountforC: build.query<StatusResponse, void>({
      query: () => '/API/posting/c-get-total-of-posts'
    })
  }),
  overrideExisting: false
})

export const {
  useBaCountQuery,
  useDmCountQuery,
  useCCountQuery,
  useCmCountQuery,
  usePostCountQuery,
  useCCountforDmQuery,
  usePostCountforDmQuery,
  usePostCountforCQuery,
  useCmCountforCQuery
} = userApi
