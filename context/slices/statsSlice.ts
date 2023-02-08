import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    standings: []
  },
  reducers: {
    setStandings: (state, action) => {
      console.log("action", action);
      state.standings = action.payload.standings;
    },
  }
 
});

// Selectors
export const getStats = (state: RootState) => state.stats;

// Reducers and actions
export const { setStandings } = statsSlice.actions;

export default statsSlice.reducer