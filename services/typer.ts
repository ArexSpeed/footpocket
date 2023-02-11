import axios from "axios";

interface Typer {
  id: string;
  league: string;
  users: [];
}
type User = {
  userId: string;
  userEmail: string;
  userName: string;
};
type PayloadCreate = {
  leagueName: string;
  user: User;
};
const BACKEND_URL =
  "https://footpoocket-default-rtdb.europe-west1.firebasedatabase.app/";

export async function createTyperLeague(payload: PayloadCreate) {
  const typerData = {
    league: payload.leagueName,
    users: [
      {
        name: payload.user.userName,
        userId: payload.user.userId,
        userEmail: payload.user.userEmail,
        score: 0,
        bets: [],
      },
    ],
  };
  const response = await axios.post(BACKEND_URL + "/typer.json", typerData);
  console.log("response create Typer League", response);
  const id = response.data.name;
  return id;
}

export async function fetchAllTypers() {
  const response = await axios.get(`${BACKEND_URL}/typer.json`);
  console.log("response typers:", response.data);
  const typers = [];

  for (const key in response.data) {
    const typerObj = {
      id: key,
      league: response.data[key].league,
      users: response.data[key].users,
    };

    typers.push(typerObj);
  }
  return typers;
}

export async function fetchUserTypersLeague(userId: string) {
  const response = await axios.get(`${BACKEND_URL}/typer.json`);
  const typers: Typer[] = [];
  const userTypers: Typer[] = [];

  for (const key in response.data) {
    const typerObj = {
      id: key,
      league: response.data[key].league,
      users: response.data[key].users,
    };

    typers.push(typerObj);
  }

  for (const key in response.data) {
    console.log("for userTypes", userTypers);
    if (response.data[key].users.find((user: any) => user.userId === userId)) {
      const typerObj = {
        id: key,
        league: response.data[key].league,
        users: response.data[key].users,
      };
      userTypers.push(typerObj);
      console.log("userTypes", userTypers);
    }
  }
  return userTypers;
}

export async function fetchOneTypers(leagueName: string) {
  const response = await axios.get(`${BACKEND_URL}/typer.json`);
  console.log("response typers:", response.data);
  const typers = [];
  for (const key in response.data) {
    const typerObj = {
      id: key,
      league: response.data[key].league,
      users: response.data[key].users,
    };

    typers.push(typerObj);
  }

  const oneLeague = typers.find((typer) => typer.league === leagueName);
  return oneLeague;
}

export async function joinToLeague(
  user: User,
  leagueId: string,
  leagueName: string
) {
  const payload = [
    {
      name: user.userName,
      score: 0,
      userEmail: user.userEmail,
      userId: user.userId,
      bets: [],
    },
  ];
  const currentLeague = await fetchOneTypers(leagueName);
  const newIndex = currentLeague?.users.length;
  const response = await axios.patch(
    `${BACKEND_URL}/typer/${leagueId}/users.json`,
    payload
  );
  console.log("response joinToLeague", response);
  const id = response.data;
  return id;
}
