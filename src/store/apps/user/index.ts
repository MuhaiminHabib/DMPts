// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from '@reduxjs/toolkit'
import { UsersType } from '../../../types/apps/userTypes'

// ** Axios Imports
import axios from 'axios'
import axiosConfig from 'src/configs/axios'
import Swal from 'sweetalert2'

interface createUserParams {
  username: string
  password: string
  passwordVerify: string
  email: string
  firstName: string
  lastName: string
  type: string
}

interface editUserParams {
  userId: string
  email: string
  firstName: string
  lastName: string
}

interface RejectedAction<ThunkArg> {
  type: string
  payload: undefined
  error: SerializedError | any
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
    condition: boolean
  }
}

interface RejectedWithValueAction<ThunkArg, RejectedValue> {
  type: string
  payload: RejectedValue
  error: { message: 'Rejected' }
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
  }
}

type Rejected = <ThunkArg>(requestId: string, arg: ThunkArg) => RejectedAction<ThunkArg>

type RejectedWithValue = <ThunkArg, RejectedValue>(
  requestId: string,
  arg: ThunkArg
) => RejectedWithValueAction<ThunkArg, RejectedValue>

export const reset = () => initialState

// ** Admin
// export const fetchBaList = createAsyncThunk('appUsers/fetchBaList', async () => {
//   const response = await axiosConfig.get('/auth/ba-list')
//   console.log(response.data)
//   return response.data
// })
// export const fetchDmList = createAsyncThunk('appUsers/fetchDmList', async () => {
//   const response = await axiosConfig.get('/auth/dm-list')
//   console.log(response.data)
//   return response.data
// })
// export const fetchCList = createAsyncThunk('appUsers/fetchCList', async () => {
//   const response = await axiosConfig.get('/auth/c-list')
//   console.log(response.data)
//   return response.data
// })
// export const fetchCmList = createAsyncThunk('appUsers/fetchCmList', async () => {
//   const response = await axiosConfig.get('/auth/cm-list')
//   console.log(response.data)
//   return response.data
// })
// export const inactiveBa = createAsyncThunk('appUsers/inactiveBa', async (data: { BAID: string; username: string }) => {
//   console.log('i will in active', data)
//   const response = await axiosConfig.post('/auth/inactive-ba', data)
//   console.log(response.data)
//   return response.data
// })
// export const createBAUser = createAsyncThunk('appUsers/createBAUser', async (data: createUserParams) => {
//   console.log('create user', data)
//   try {
//     const response = await axiosConfig.post('/auth/create-user', data)
//     // console.log(response)
//     return response.data
//   } catch (error : SerializedError) {
//      // Check if the error has a response object from Axios
//      if (error.response) {
//       return rejectWithValue(error.response.data);
//     } else {
//       // If there's no response object, reject with a generic error
//       return rejectWithValue({ error: 'An error occured'})
//   }
// })

// export const createBAUser = createAsyncThunk('appUsers/createBAUser', async (data: createUserParams) => {
//   const response = await axiosConfig.post('/auth/create-user', data)
//   return response.data
// })

// ** BA

// ===========Conversion Done===============
// export const fetchDmListforBA = createAsyncThunk('appUsers/fetchDmListforBA', async () => {
//   const response = await axiosConfig.get('/auth/ba-gets-all-dms')
//   console.log('fetchDmListforBA: ', response.data)
//   return response.data
// })

// export const baDeleteDm = createAsyncThunk('appUsers/baDeleteDm', async (data: { dmId: string }) => {
//   console.log('i will delete', data.dmId)
//   const response = await axiosConfig.delete('/auth/ba-delete-dm', { data: { dmId: data.dmId } })
//   console.log(response.data)
//   return response.data
// })

// export const logOutUser = createAsyncThunk('appUsers/logOutUser', async () => {
//   console.log('logging out')
//   const response = await axiosConfig.get('/auth/logout')
//   console.log(response.data)
//   return response.data
// })

// export const fetchCListforBA = createAsyncThunk('appUsers/fetchCListforBA', async () => {
//   const response = await axiosConfig.get('/auth/ba-gets-all-c')
//   console.log(response.data)
//   return response.data
// })

// export const baDeleteC = createAsyncThunk('appUsers/baDeleteC', async (data: { cId: string }) => {
//   console.log('i will delete', data.cId)
//   const response = await axiosConfig.delete('/auth/ba-delete-c', { data: { cId: data.cId } })
//   console.log(response.data)
//   return response.data
// })
// export const editUserInfo = createAsyncThunk('appUsers/editUserInfo', async (data: editUserParams) => {
//   console.log('i will edit user info', data)
//   const response = await axiosConfig.put('/auth/edit-user-info', data)
//   console.log(response.data)
//   return response.data
// })

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
    // builder.addCase(fetchBaList.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   state.baList = action.payload
    //   state.isLoading = false
    //   state.isError = false
    //   console.log('action is: ', action.payload)
    // })
    // builder.addCase(fetchBaList.pending, state => {
    //   Swal.fire('loading')
    //   console.log('fetching ba list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(fetchBaList.rejected, (state, action) => {
    //   Swal.fire('rejected')
    //   console.log('fetching ba list: error')
    //   state.isLoading = false
    //   state.isError = true
    //   console.log(state.error)
    // })
    //DM
    // builder.addCase(fetchDmList.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   state.dmList = action.payload
    //   state.isLoading = false
    //   state.isError = false
    //   console.log('action is: ', action.payload)
    // })
    // builder.addCase(fetchDmList.pending, state => {
    //   Swal.fire('loading')
    //   console.log('fetchDmList list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(fetchDmList.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('fetchDmList list: error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    //C
    // builder.addCase(fetchCList.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   state.cList = action.payload
    //   state.isLoading = false
    //   state.isError = false
    //   console.log('action is: ', action.payload)
    // })
    // builder.addCase(fetchCList.pending, state => {
    //   Swal.fire('loading')
    //   console.log('fetchCList list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(fetchCList.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('fetchCList list: error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    //CM
    // builder.addCase(fetchCmList.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   state.cmList = action.payload
    //   console.log('action is: ', action.payload)
    //   state.isLoading = false
    //   state.isError = false
    // })
    // builder.addCase(fetchCmList.pending, state => {
    //   Swal.fire('loading')
    //   console.log('fetchCmList list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(fetchCmList.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('fetchCmList list: error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    //Inactive BA
    // builder.addCase(inactiveBa.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   console.log('action is: ', action.payload)
    //   state.baList.map(item => (item._id === action.payload._id ? (item.active = false) : null))
    //   state.isLoading = false
    //   state.isError = false
    // })
    // builder.addCase(inactiveBa.pending, state => {
    //   Swal.fire('loading')
    //   console.log('inactiveBa list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(inactiveBa.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('inactiveBa list: error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    //Create BA
    // builder.addCase(createBAUser.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   console.log('action is: ', action.payload)
    //   if (
    //     action.payload.role === 'BA'
    //       ? (state.baList[state.baList.length] = action.payload)
    //       : action.payload.role === 'DM'
    //       ? (state.dmList[state.dmList.length] = action.payload)
    //       : action.payload.role === 'C'
    //       ? (state.cList[state.cList.length] = action.payload)
    //       : null
    //   )
    //     state.isLoading = false
    //   state.isError = false
    // })
    // builder.addCase(createBAUser.pending, state => {
    //   Swal.fire('Loading')
    //   console.log('creating user  loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(createBAUser.rejected, (state, action) => {
    //   Swal.fire('rejected')
    //   console.log('creating user : error')
    //   console.log(action)
    //   state.isLoading = false
    //   state.isError = true
    // })
    /////////////////BA
    // builder.addCase(fetchDmListforBA.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   state.dmList = action.payload
    //   state.isLoading = false
    //   state.isError = false
    //   console.log('action is: ', action.payload)
    // })
    // builder.addCase(fetchDmListforBA.pending, state => {
    //   Swal.fire('loading')
    //   console.log('creating user  loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(fetchDmListforBA.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('creating user : error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    //Delete DM
    // builder.addCase(baDeleteDm.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   console.log('action is: ', action.payload._id)
    //   state.dmList = state.dmList.filter(item => item._id.toString() !== action.payload._id.toString())
    //   state.isLoading = false
    //   state.isError = false
    // })
    // builder.addCase(baDeleteDm.pending, state => {
    //   Swal.fire('loading')
    //   console.log('baDeleteDm list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(baDeleteDm.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('baDeleteDm list: error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    ///BA fetches C list
    // builder.addCase(fetchCListforBA.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   state.cList = action.payload
    //   state.isLoading = false
    //   state.isError = false
    //   console.log('action is: ', action.payload)
    // })
    // builder.addCase(fetchCListforBA.pending, state => {
    //   Swal.fire('loading')
    //   console.log('fetchCListforBA list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(fetchCListforBA.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('fetchCListforBA list: error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    //Delete C
    // builder.addCase(baDeleteC.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   console.log('action is: ', action.payload._id)
    //   state.cList = state.cList.filter(item => item._id.toString() !== action.payload._id.toString())
    //   state.isLoading = false
    //   state.isError = false
    // })
    // builder.addCase(baDeleteC.pending, state => {
    //   Swal.fire('loading')
    //   console.log('baDeleteC list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(baDeleteC.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('baDeleteC list: error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    //Edit User Info
    // builder.addCase(editUserInfo.fulfilled, (state, action) => {
    //   Swal.fire('success')
    //   console.log('action is: ', action.payload.role)
    //   action.payload.role === 'BA'
    //     ? (state.baList = state.baList.map(user =>
    //         user._id.toString() === action.payload._id.toString() ? action.payload : user
    //       ))
    //     : action.payload.role === 'DM'
    //     ? (state.dmList = state.dmList.map(user =>
    //         user._id.toString() === action.payload._id.toString() ? action.payload : user
    //       ))
    //     : action.payload.role === 'C'
    //     ? (state.cList = state.cList.map(user =>
    //         user._id.toString() === action.payload._id.toString() ? action.payload : user
    //       ))
    //     : null
    //   state.isLoading = false
    //   state.isError = false
    // })
    // builder.addCase(editUserInfo.pending, state => {
    //   Swal.fire('loading')
    //   console.log('editUserInfo list loading')
    //   state.isLoading = true
    //   state.isError = false
    // })
    // builder.addCase(editUserInfo.rejected, state => {
    //   Swal.fire('rejected')
    //   console.log('editUserInfo list: error')
    //   state.isLoading = false
    //   state.isError = true
    // })
    // builder.addCase(logOutUser.fulfilled, (state, action) => {
    //   window.localStorage.removeItem('userData')
    //   window.localStorage.removeItem('accessToken')
    //   window.localStorage.removeItem('refreshToken')
    //   window.location.replace('/login')
    // })
  }
})

export default appUsersSlice.reducer
