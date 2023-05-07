// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { PostsTypes } from 'src/types/apps/postTypes'
import axiosConfig from 'src/configs/axios'

interface FetchDataParams {
  page: number
}

interface CreatePostParams {
  boost: false
  client: string
  description: string
  permissionLevel: 'D' | 'C'
  platform: 'google' | 'fb'
  postingDate: string
  postingEndDate: string
  title: string
  url: string
}

// ** Fetch Invoices
export const fetchPosts = createAsyncThunk('appPost/fetchPost', async (params: FetchDataParams) => {
  const response = await axiosConfig.get(`/posting/page/${params.page}`)
  return response.data
})
// ** Create Invoices
export const createPost = createAsyncThunk('appPost/createPost', async (data: CreatePostParams) => {
  const response = await axiosConfig.post(`/posting/new`, data)
  console.log('from thunk', data)
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
      state.posts = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchPosts.pending, state => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
    })

    //Create Posts
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts[state.posts.length] = action.payload
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(createPost.pending, state => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
    })
  }
})

export default postSlice.reducer
