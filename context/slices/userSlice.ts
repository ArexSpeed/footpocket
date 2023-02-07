import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

interface UserSlice {
  userId: string;
  userEmail: string;
  token: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userEmail: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("action", action);
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      // add token later
    },
    resetUser: ( state ) => {
      state.userId = null;
      state.userEmail = null;
    },
  }
 
});

// Selectors
export const getUser = (state: RootState) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer