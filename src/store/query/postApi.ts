import type { PostsTypes as Post } from 'src/types/apps/postTypes'
import { baseApi } from './baseApi'

interface CreatePostParams {
  boost: boolean
  client: string
  description: string
  permissionLevel: 'D' | 'C'
  platform: 'google' | 'fb'
  postingDate: string
  postingEndDate: string
  title: string
  url: string
  fileName?: string
}
type platform = {
  platform: string
}
interface EditPostParams {
  id: string
  boost: string
  description: string
  permissionLevel: string
  platform: platform[]
  postingDate: string
  postingEndDate: string
  title: string
  url: string
}

const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchPosts: build.query<Post[], string>({
      query: page => `/API/posting/page/${page}`,
      providesTags: ['Post']
    }),
    fetchPostsforDM: build.query<Post[], string>({
      query: page => `/API/posting/dm-get-posts`,
      providesTags: ['Post']
    }),
    fetchPostsforC: build.query<Post[], string>({
      query: page => `/API/posting/c-get-posts`,
      providesTags: ['Post']
    }),
    fetchPostsforCm: build.query<Post[], string>({
      query: page => `/API/posting/cm-get-posts`,
      providesTags: ['Post']
    }),
    createPost: build.mutation<Post, Partial<Post>>({
      query(data) {
        console.log('create post rtk:', data)
        return {
          url: '/API/posting/new',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['Post']
    }),
    editPost: build.mutation<Post, EditPostParams & Pick<EditPostParams, 'id'>>({
      query(data) {
        console.log('from edit rtk query:', data)
        return {
          url: `/API/posting/${data.id}`,
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
    })
  }),
  overrideExisting: false
})

export const {
  useFetchPostsQuery,
  useFetchPostsforDMQuery,
  useFetchPostsforCQuery,
  useFetchPostsforCmQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation
} = postApi
