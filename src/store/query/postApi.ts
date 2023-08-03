import type { Post } from 'src/types/apps/postSchema'
import { baseApi } from './baseApi'
import { scales } from 'chart.js'

type PostObj = {
  info: {
    totalNumberOfPostings: number
  }
  postings: Post[]
}

const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchPosts: build.query<PostObj, number>({
      query: page => `/API/posting/page/${page}`,
      providesTags: ['Post']
    }),
    fetchPostsforDM: build.query<PostObj, void>({
      query: () => `/API/posting/dm-get-posts`,
      providesTags: ['Post']
    }),
    fetchPostsforC: build.query<PostObj, void>({
      query: () => `/API/posting/c-get-posts`,
      providesTags: ['Post']
    }),
    fetchPostsforCm: build.query<PostObj, void>({
      query: () => `/API/posting/cm-get-posts`,
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
  useFetchPostsQuery,
  useFetchPostsforDMQuery,
  useFetchPostsforCQuery,
  useFetchPostsforCmQuery,
  useFetchPostDetailsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useDownloadAttachmentMutation,
  useSearchPostsMutation
} = postApi
