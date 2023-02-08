import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

type Standings = {
    all: string;
}

type League = {
    league: {
        standings: Standings[][];
    }
}
interface StatsState {
    standings: {
        response: League[];
    }
}

const initialState: StatsState= {
    standings: {
        response: [{league: {standings: [[{all: ''}]]}}]
    }
}

const statsSlice = createSlice({
  name: "stats",
  initialState,
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