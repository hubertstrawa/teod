import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './features/auth/authSlice'
import chatReducer from './features/chat/chatSlice'
import { setNotification } from './features/notification/notificationSlice'
import notificationReducer from './features/notification/notificationSlice'

import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice'
import { useToast } from '@chakra-ui/react'

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // const toast = useToast()

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!', action)
      api.dispatch(setNotification(action.payload.data.message))
      // toast.warn({ title: 'Async error!', message: action.error.data.message })
    }

    return next(action)
  }

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    chat: chatReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(rtkQueryErrorLogger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
