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

interface Redux {
  getState: any
  dispatch: Dispatch<any>
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

// ** Add User
// export const addUser = createAsyncThunk(
//   'appUsers/addUser',
//   async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
//     const response = await axios.post('http://192.168.1.35/API/add_user', {
//       data
//     })
//     dispatch(fetchData(getState().user.params))

//     return response.data
//   }
// )

// ** Delete User
// export const deleteUser = createAsyncThunk(
//   'appUsers/deleteUser',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await axios.delete('http://192.168.1.35/API/auth/delete', {
//       data: id
//     })
//     dispatch(fetchData(getState().user.params))

//     return response.data
//   }
// )

interface UserState {
  baList: UsersType[]
  dmList: UsersType[]
  cList: UsersType[]
  cmList: UsersType[]
}

const initialState: UserState = {
  baList: [],
  dmList: [],
  cList: [],
  cmList: []
}

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBaList.fulfilled, (state, action) => {
      state.baList = action.payload
      console.log('action is: ', action.payload)
    })
    builder.addCase(fetchDmList.fulfilled, (state, action) => {
      state.dmList = action.payload
      console.log('action is: ', action.payload)
    })
    builder.addCase(fetchCList.fulfilled, (state, action) => {
      state.cList = action.payload
      console.log('action is: ', action.payload)
    })
    builder.addCase(fetchCmList.fulfilled, (state, action) => {
      state.cmList = action.payload
      console.log('action is: ', action.payload)
    })
    builder.addCase(inactiveBa.fulfilled, (state, action) => {
      console.log('action is: ', action.payload)
      state.baList.map(item => (item._id === action.payload._id ? (item.active = false) : null))
    })
    builder.addCase(createBAUser.fulfilled, (state, action) => {
      console.log('action is: ', action.payload)
      state.baList[state.baList.length] = action.payload
    })
  }
})

export default appUsersSlice.reducer
