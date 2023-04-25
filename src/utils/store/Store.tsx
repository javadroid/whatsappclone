import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import userSlice from './userSlice'
import chatSlice from './chatSlice'
import messageSlice from './messageSlice'

export const store = configureStore({
  reducer: {
    auth:AuthSlice,
    users:userSlice,
    chats:chatSlice,
    messages:messageSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch