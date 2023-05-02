// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { UsersType } from '../../../types/apps/userTypes'

// ** Axios Imports
import axios from 'axios'
import axiosConfig from 'src/configs/axios'

interface createUserParams {
  username: string
  password: string
  passwordVerify: string
  email: string
  firstName: string
  lastName: string
  type: string
}

// ** Fetch Users
export const fetchBaList = createAsyncThunk('appUsers/fetchBaList', async () => {
  const response = await axiosConfig.get('/auth/ba-list')
  console.log(response.data)
  return response.data
})
export const fetchDmList = createAsyncThunk('appUsers/fetchDmList', async () => {
  const response = await axiosConfig.get('/auth/dm-list')
  console.log(response.data)
  return response.data
})
export const fetchCList = createAsyncThunk('appUsers/fetchCList', async () => {
  const response = await axiosConfig.get('/auth/c-list')
  console.log(response.data)
  return response.data
})
export const fetchCmList = createAsyncThunk('appUsers/fetchCmList', async () => {
  const response = await axiosConfig.get('/auth/cm-list')
  console.log(response.data)
  return response.data
})
export const inactiveBa = createAsyncThunk('appUsers/inactiveBa', async (data: { BAID: string; username: string }) => {
  console.log('i will in active', data)
  const response = await axiosConfig.post('/auth/inactive-ba', data)
  console.log(response.data)
  return response.data
})
export const createBAUser = createAsyncThunk('appUsers/createBAUser', async (data: createUserParams) => {
  console.log('create user', data)
  const response = await axiosConfig.post('/auth/create-user', data)
  console.log(response.data)
  return response.data
})

interface UserState {
  baList: UsersType[]
  dmList: UsersType[]
  cList: UsersType[]
  cmList: UsersType[]
  isLoading: boolean
  isError: boolean
  error: string
}

const initialState: UserState = {
  baList: [],
  dmList: [],
  cList: [],
  cmList: [],
  isLoading: false,
  isError: false,
  error: ''
}

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //BA
    builder.addCase(fetchBaList.fulfilled, (state, action) => {
      state.baList = action.payload
      state.isLoading = false
      state.isError = false
      console.log('action is: ', action.payload)
    })
    builder.addCase(fetchBaList.pending, state => {
      console.log('fetching ba list loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchBaList.rejected, (state, action) => {
      console.log('fetching ba list: error')
      state.isLoading = false
      state.isError = true
      if (action === undefined) {
        state.error = 'Error connecting the server'
      }
      console.log(state.error)
    })

    //DM
    builder.addCase(fetchDmList.fulfilled, (state, action) => {
      state.dmList = action.payload
      state.isLoading = false
      state.isError = false
      console.log('action is: ', action.payload)
    })
    builder.addCase(fetchDmList.pending, state => {
      console.log('fetchDmList list loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchDmList.rejected, state => {
      console.log('fetchDmList list: error')
      state.isLoading = false
      state.isError = true
    })

    //C
    builder.addCase(fetchCList.fulfilled, (state, action) => {
      state.cList = action.payload
      state.isLoading = false
      state.isError = false
      console.log('action is: ', action.payload)
    })
    builder.addCase(fetchCList.pending, state => {
      console.log('fetchCList list loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchCList.rejected, state => {
      console.log('fetchCList list: error')
      state.isLoading = false
      state.isError = true
    })

    //CM
    builder.addCase(fetchCmList.fulfilled, (state, action) => {
      state.cmList = action.payload
      console.log('action is: ', action.payload)
      state.isLoading = false
      state.isError = false
    })

    builder.addCase(fetchCmList.pending, state => {
      console.log('fetchCmList list loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchCmList.rejected, state => {
      console.log('fetchCmList list: error')
      state.isLoading = false
      state.isError = true
    })

    //Inactive BA
    builder.addCase(inactiveBa.fulfilled, (state, action) => {
      console.log('action is: ', action.payload)
      state.baList.map(item => (item._id === action.payload._id ? (item.active = false) : null))
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(inactiveBa.pending, state => {
      console.log('inactiveBa list loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(inactiveBa.rejected, state => {
      console.log('inactiveBa list: error')
      state.isLoading = false
      state.isError = true
    })

    //Create BA
    builder.addCase(createBAUser.fulfilled, (state, action) => {
      console.log('action is: ', action.payload)
      state.baList[state.baList.length] = action.payload
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(createBAUser.pending, state => {
      console.log('creating user  loading')
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(createBAUser.rejected, state => {
      console.log('creating user : error')
      state.isLoading = false
      state.isError = true
    })
  }
})

export default appUsersSlice.reducer
