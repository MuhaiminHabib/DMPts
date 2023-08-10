import type { Post } from 'src/types/apps/postSchema'
import { baseApi } from './baseApi'

type PostObj = {
  info: {
    totalNumberOfPostings: number
  }
  postings: Post[]
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
  useDeletePostMutation,
  useDownloadAttachmentMutation,
  useSearchPostsMutation
} = postApi
