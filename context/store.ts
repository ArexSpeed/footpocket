import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import userReducer from './slices/userSlice';
import simulatorReducer from './slices/simulatorSlice';
import statsReducer from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    user: userReducer,
    simulator: simulatorReducer,
    stats: statsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;