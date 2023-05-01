// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import post from 'src/store/apps/post'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import { baseApi } from './query/baseApi'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    post,
    calendar,
    permissions,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: gDM => gDM().concat(baseApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
