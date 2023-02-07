import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

interface UserSlice {
  userId: string;
  userName: string;
  token: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userName: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.id;
      state.userName = action.payload.name;
      // add token later
    },
    resetUser: ( state ) => {
      state.userId = null;
      state.userName = null;
    },
  }
 
});

// Selectors
export const getUser = (state: RootState) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer