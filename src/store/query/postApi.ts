import type { Post } from 'src/types/apps/postSchema'
import { baseApi } from './baseApi'

type PostObj = {
  info: {
    totalNumberOfPostings: number
  }
  postings: Post[]
}
type FilterParams = {
  platform: string
  start_date: string
  end_date: string
  ba_id: string
  dm_id: string
  client_id: string
  type: 'P' | 'D' | 'S'
}

type SearchParams = {
  criteria: string
  type: 'P' | 'D' | 'S'
}

const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchPublishedPosts: build.query<PostObj, number>({
      query: page => `/API/posting/published-posts/${page}`,
      providesTags: ['Post']
    }),
    fetchScheduledPosts: build.query<PostObj, number>({
      query: page => `/API/posting/scheduled-posts/${page}`,
      providesTags: ['Post']
    }),
    fetchDraftPosts: build.query<PostObj, number>({
      query: page => `/API/posting/draft-posts/${page}`,
      providesTags: ['Post']
    }),
    fetchPostDetails: build.query<Post, string>({
      query: id => `/API/posting/detail/${id}`,
      providesTags: ['Post']
    }),
    createPost: build.mutation<Post, Partial<Post>>({
      query(data) {
        return {
          url: '/API/posting/new',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['Post']
    }),
    editPost: build.mutation<Post, Post & Pick<Post, '_id'>>({
      query(data) {
        return {
          url: `/API/posting/${data._id}`,
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: ['Post']
    }),
    filterPosts: build.mutation<Post, FilterParams>({
      query({ platform, start_date, end_date, ba_id, dm_id, client_id, type }) {
        return {
          url: `/API/posting/v2/filter`,
          params: { platform, start_date, end_date, ba_id, dm_id, client_id, type }
        }
      },
      invalidatesTags: ['Post']
    }),
    deletePost: build.mutation<Post, string>({
      query(postId) {
        return {
          url: `/API/posting/${postId}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Post']
    }),
    downloadAttachment: build.mutation<Blob, string>({
      query(postId) {
        return {
          url: `/API/posting/download/${postId}`
        }
      },
      invalidatesTags: ['Post']
    }),
    searchPosts: build.mutation<Post[], SearchParams>({
      query({ criteria, type }) {
        return {
          url: `/API/posting/v2/search`,
          params: { criteria, type }
        }
      },
      invalidatesTags: ['Post']
    })
  }),
  overrideExisting: false
})

export const {
  useFetchPublishedPostsQuery,
  useFetchScheduledPostsQuery,
  useFetchDraftPostsQuery,
  useFetchPostDetailsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useFilterPostsMutation,
  useDeletePostMutation,
  useDownloadAttachmentMutation,
  useSearchPostsMutation
} = postApi
