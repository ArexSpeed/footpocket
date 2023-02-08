import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import userReducer from './slices/userSlice';
import statsReducer from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    user: userReducer,
    stats: statsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;