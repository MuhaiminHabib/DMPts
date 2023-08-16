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
      query({ platform, start_date, end_date, ba_id, dm_id, client_id }) {
        return {
          url: `/API/posting/filter?platform=${platform}&start_date=${start_date}&end_date=${end_date}&client_id=${client_id}&ba_id=${ba_id}&dm_id=${dm_id}`
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
    searchPosts: build.mutation<Post[], string>({
      query(searchStr) {
        return {
          url: `/API/posting/search?criteria=${searchStr}`
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
