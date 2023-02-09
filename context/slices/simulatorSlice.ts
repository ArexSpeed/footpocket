import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import teamsData from "../../data/teams.json";

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
};

interface Schedule {
  round: number;
  games: {
    round: number;
    id: string;
    host: Team;
    hostScore: number;
    guest: Team;
    guestScore: number;
    isPlayed: boolean;
  }[];
}

interface SimulatorState {
  league: string;
  teams: Team[];
  table: Table[];
  schedule: Schedule[];
}

const initialState: SimulatorState = {
  league: "",
  teams: [],
  table: [],
  schedule: [],
};

const simulatorSlice = createSlice({
  name: "simulator",
  initialState,
  reducers: {
    setLeague: (state, action) => {
      // console.log("action", action);
      state.league = action.payload.league;
      const selectedTeams = teamsData.find(
        (item) => item.leagueName === action.payload.league
      );
      state.teams = selectedTeams ? selectedTeams.teams : [];
    },
    updateTeam: (state, action) => {
      // console.log("action", action);
      const teamId = state.teams.findIndex(
        (team) => team.id === action.payload.id
      );
      state.teams[teamId] = action.payload;
    },
    createTable: (state, action) => {
      const initTable: Table[] = [];
      action.payload.forEach((item: Team) =>
        initTable.push({
          name: item.name,
          games: 0,
          win: 0,
          draw: 0,
          loses: 0,
          goalPlus: 0,
          goalMinus: 0,
          points: 0,
        })
      );
      state.table = initTable;
    },
    createSchedule: (state, action) => {
      state.schedule = action.payload;
    },
    playGame: (state, action) => {
      //console.log("paylaod", action.payload);
      const findRound = state.schedule.find(
        (round) => round.round === action.payload.round
      );
      const roundId = state.schedule.findIndex(
        (round) => round.round === action.payload.round
      );
      const gameId = findRound?.games.findIndex(
        (game) => game.id === action.payload.gameId
      );
      if (gameId !== undefined) {
        state.schedule[roundId].games[gameId].hostScore =
          action.payload.hostScore;
        state.schedule[roundId].games[gameId].guestScore =
          action.payload.guestScore;
        state.schedule[roundId].games[gameId].isPlayed = true;
      }
    },
    updateTable: (state, action) => {
      const teamHostId = state.table.findIndex(
        (team) => team.name === action.payload.host.name
      );
      const teamGuestId = state.table.findIndex(
        (team) => team.name === action.payload.guest.name
      );
      const teamHost = state.table.find(
        (team) => team.name === action.payload.host.name
      );
      const teamGuest = state.table.find(
        (team) => team.name === action.payload.guest.name
      );
      if (teamHost && teamGuest) {
        const hostUpdate = {
          name: teamHost?.name,
          games: teamHost?.games + action.payload.hostTable.games,
          win: teamHost?.win + action.payload.hostTable.win,
          draw: teamHost?.draw + action.payload.hostTable.draw,
          loses: teamHost?.loses + action.payload.hostTable.loses,
          goalPlus: teamHost?.goalPlus + action.payload.hostTable.goalPlus,
          goalMinus: teamHost?.goalMinus + action.payload.hostTable.goalMinus,
          points: teamHost?.points + action.payload.hostTable.points,
        };
        const guestUpdate = {
          name: teamGuest?.name,
          games: teamGuest?.games + action.payload.guestTable.games,
          win: teamGuest?.win + action.payload.guestTable.win,
          draw: teamGuest?.draw + action.payload.guestTable.draw,
          loses: teamGuest?.loses + action.payload.guestTable.loses,
          goalPlus: teamGuest?.goalPlus + action.payload.guestTable.goalPlus,
          goalMinus: teamGuest?.goalMinus + action.payload.guestTable.goalMinus,
          points: teamGuest?.points + action.payload.guestTable.points,
        };
        state.table[teamHostId] = hostUpdate;
        state.table[teamGuestId] = guestUpdate;
        state.table = state.table.sort(
          (a, b) =>
            b.points - a.points ||
            b.goalPlus - a.goalPlus ||
            a.goalMinus - b.goalMinus
        );
      }
    },
  },
});

// Selectors
export const getSimulator = (state: RootState) => state.simulator;

// Reducers and actions
export const {
  setLeague,
  updateTeam,
  createTable,
  createSchedule,
  playGame,
  updateTable,
} = simulatorSlice.actions;

export default simulatorSlice.reducer;
