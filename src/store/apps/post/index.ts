// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { PostsTypes } from 'src/types/apps/postTypes'
import axiosConfig from 'src/configs/axios'

interface DataParams {
  page: number
}

// ** Fetch Invoices
export const fetchPosts = createAsyncThunk('appPost/fetchPost', async (params: DataParams) => {
  const response = await axiosConfig.get(`/posting/page/${params.page}`)
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
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchPosts.pending, state => {
      state.isLoading = true
    })
    // builder.addCase(fetchPosts.rejected, (state, action) => {
    //   state.posts = action.payload
    // })
  }
})

export default postSlice.reducer
