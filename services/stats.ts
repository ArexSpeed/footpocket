import { RAPID_API } from "@env";

export function getStandings(league: string) {
  let leagueId = "39";
  switch (league) {
    case "Premier League":
      leagueId = "39";
      break;
    case "Serie A":
      leagueId = "135";
      break;
    case "La Liga":
      leagueId = "140";
      break;
    default:
      leagueId = "39";
  }

  const options = {
    method: "GET",
    url: "https://api-football-beta.p.rapidapi.com/standings",
    params: { season: "2022", league: leagueId },
    headers: {
      "X-RapidAPI-Key": RAPID_API,
      "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
    },
  };
  return options;
}

export function getFixtures(league: string) {
  let leagueId = "39";
  switch (league) {
    case "Premier League":
      leagueId = "39";
      break;
    case "Serie A":
      leagueId = "135";
      break;
    case "La Liga":
      leagueId = "140";
      break;
    default:
      leagueId = "39";
  }

  const options = {
    method: "GET",
    url: "https://api-football-beta.p.rapidapi.com/fixtures",
    params: { season: "2022", league: leagueId },
    headers: {
      "X-RapidAPI-Key": RAPID_API,
      "X-RapidAPI-Host": "https://api-football-beta.p.rapidapi.com",
    },
  };
  return options;
}
