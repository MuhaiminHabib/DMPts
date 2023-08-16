import { baseApi } from './baseApi'
import { FbPage } from 'src/types/apps/FbPageSchema'
import { Post } from 'src/types/apps/postSchema'

const fbApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchFbPageList: build.query<FbPage[], void>({
      query: () => `/API/fb-api/get-fb-pages-list`,
      providesTags: ['FbPages']
    }),
    fetchFbPageListByClientId: build.mutation<FbPage[], string>({
      query: cid => ({
        url: `/API/fb-api/get-fb-pages-list-by-client?cid=${cid}`,
        method: 'GET'
      }),
      invalidatesTags: ['FbPages']
    }),

    publishToFb: build.mutation<Post, any>({
      query: body => ({
        url: `/API/fb-api/publish-to-fb`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Post']
    }),
    scheduleToFb: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: `/API/fb-api/schedule-post-to-fb`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Post']
    }),
    draftToFb: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: `/API/fb-api/draft-to-fb`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Post']
    }),
    addFbPage: build.mutation<FbPage[], { token: string; cid: string }>({
      query: ({ token, cid }) => ({
        url: `/API/fb-api/add-new-pages?token=${token}&cid=${cid}`,
        method: 'GET'
      }),
      invalidatesTags: ['FbPages']
    }),
    deleteFbPage: build.mutation<FbPage[], string>({
      query: pageId => ({
        url: `/API/fb-api/${pageId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['FbPages']
    })
  }),
  overrideExisting: false
})

export const {
  useFetchFbPageListQuery,
  useFetchFbPageListByClientIdMutation,
  usePublishToFbMutation,
  useScheduleToFbMutation,
  useDraftToFbMutation,
  useAddFbPageMutation,
  useDeleteFbPageMutation
} = fbApi
