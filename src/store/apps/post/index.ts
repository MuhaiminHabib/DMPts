// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { PostsTypes } from 'src/types/apps/postTypes'
import axiosConfig from 'src/configs/axios'
import Swal from 'sweetalert2'

interface FetchDataParams {
  page: number
}

type platform = {
  platform: string
}

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
  fileName: string
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

// ** Fetch Posts
export const fetchPosts = createAsyncThunk('appPost/fetchPost', async (params: FetchDataParams) => {
  const response = await axiosConfig.get(`/posting/page/${params.page}`)
  return response.data
})
// ** Create Post
export const createPost = createAsyncThunk('appPost/createPost', async (data: CreatePostParams) => {
  const response = await axiosConfig.post(`/posting/new`, data)
  console.log('from thunk', data)
  return response.data
})
// ** Edit Post
export const editPost = createAsyncThunk('appPost/editPost', async (data: EditPostParams) => {
  const response = await axiosConfig.put(`/posting/${data.id}`, data)
  console.log('from post edit thunk', response.data)
  return response.data
})
// ** Delete Post
export const deletePost = createAsyncThunk('appPost/deletePost', async (postId: string) => {
  const response = await axiosConfig.delete(`/posting/${postId}`)
  console.log('from post edit thunk', response.data)
  return response.data
})

interface UserState {
  isLoading: boolean
  isError: boolean
  error: string
  posts: PostsTypes[]
}

const initialState: UserState = {
  isLoading: false,
  isError: false,
  error: '',
  posts: []
}

export const postSlice = createSlice({
  name: 'appPost',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //Fetch Posts
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      Swal.fire('success')
      state.posts = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchPosts.pending, state => {
      Swal.fire('loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      Swal.fire('rejected')
      state.isLoading = false
      state.isError = true
    })

    //Create Posts
    builder.addCase(createPost.fulfilled, (state, action) => {
      Swal.fire('success')
      state.posts[state.posts.length] = action.payload
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(createPost.pending, state => {
      Swal.fire('loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(createPost.rejected, (state, action) => {
      Swal.fire('rejected')
      state.isLoading = false
      state.isError = true
    })
    //Edit Posts
    builder.addCase(editPost.fulfilled, (state, action) => {
      Swal.fire('success')
      console.log('action payload is:', action.payload)
      state.posts = state.posts.map(post =>
        post._id.toString() === action.payload._id.toString() ? action.payload : post
      )
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(editPost.pending, state => {
      Swal.fire('loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(editPost.rejected, (state, action) => {
      Swal.fire('rejected')
      state.isLoading = false
      state.isError = true
    })
    //Delete Posts
    builder.addCase(deletePost.fulfilled, (state, action) => {
      Swal.fire('success')
      state.posts = state.posts.filter(post => post._id.toString() !== action.payload.toString())
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(deletePost.pending, state => {
      Swal.fire('loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(deletePost.rejected, state => {
      Swal.fire('rejected')
      state.isLoading = false
      state.isError = true
    })
  }
})

export default postSlice.reducer
