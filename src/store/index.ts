// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers

import { baseApi } from './query/baseApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: gDM => gDM().concat(baseApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
