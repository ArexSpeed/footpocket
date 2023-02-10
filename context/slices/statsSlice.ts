import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type Standings = {
  all: string;
};

type League = {
  league: {
    standings: Standings[][];
  };
};
interface StatsState {
  selectedLeague: string;
  standingsEng: {
    response: League[];
    fetched: boolean;
  };
  standingsIta: {
    response: League[];
    fetched: boolean;
  };
  standingsSpa: {
    response: League[];
    fetched: boolean;
  };
}

const initialState: StatsState = {
  selectedLeague: "Premier League",
  standingsEng: {
    response: [{ league: { standings: [[{ all: "" }]] } }],
    fetched: false,
  },
  standingsIta: {
    response: [{ league: { standings: [[{ all: "" }]] } }],
    fetched: false,
  },
  standingsSpa: {
    response: [{ league: { standings: [[{ all: "" }]] } }],
    fetched: false,
  },
  //   standings: {
  //     response: [{ league: { standings: [[{ all: "" }]] } }],
  //   },
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setSelectedLeague: (state, action) => {
      state.selectedLeague = action.payload;
    },
    setStandingsEng: (state, action) => {
      console.log("action", action);
      state.standingsEng.response = action.payload.standings.response;
      state.standingsEng.fetched = true;
    },
    setStandingsIta: (state, action) => {
      console.log("action", action);
      state.standingsIta.response = action.payload.standings.response;
      state.standingsIta.fetched = true;
    },
    setStandingsSpa: (state, action) => {
      console.log("action", action);
      state.standingsSpa.response = action.payload.standings.response;
      state.standingsSpa.fetched = true;
    },
  },
});

// Selectors
export const getStats = (state: RootState) => state.stats;

// Reducers and actions
export const {
  setSelectedLeague,
  setStandingsEng,
  setStandingsIta,
  setStandingsSpa,
} = statsSlice.actions;

export default statsSlice.reducer;
