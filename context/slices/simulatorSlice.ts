import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';
import teamsData from '../../data/teams.json';

type Team = {
    id: string;
    name: string;
    att: number;
    mid: number;
    def: number;
  };

  type Table = {
    name: string;
    games: number;
    win: number;
    draw: number;
    loses: number;
    goalPlus: number;
    goalMinus: number;
    points: number;
  }

interface SimulatorState {
    league: string;
    teams: Team[];
    table: Table[],
}

const initialState: SimulatorState = {
    league: '',
    teams: [],
    table: []
}

const simulatorSlice = createSlice({
  name: "simulator",
  initialState,
  reducers: {
    setLeague: (state, action) => {
      console.log("action", action);
      state.league = action.payload.league;
      const selectedTeams = teamsData.find(
        (item) => item.leagueName === action.payload.league
      );
      state.teams = selectedTeams ? selectedTeams.teams : [];
    },
    updateTeam: (state, action) => {
        console.log("action", action);
        const teamId = state.teams.findIndex((team) => team.id === action.payload.id);
        state.teams[teamId] = action.payload;
    },
    createTable: (state, action) => {
        const initTable: Table[] = [];
        action.payload.forEach((item: Team) => initTable.push({
            name: item.name,
            games: 0,
            win: 0,
            draw: 0,
            loses: 0,
            goalPlus: 0,
            goalMinus: 0,
            points: 0,
        }));
        state.table = initTable;
    }
  }
 
});

// Selectors
export const getSimulator = (state: RootState) => state.simulator;

// Reducers and actions
export const { setLeague, updateTeam, createTable } = simulatorSlice.actions;

export default simulatorSlice.reducer