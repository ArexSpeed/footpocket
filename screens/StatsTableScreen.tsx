import { useEffect, useState } from "react";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Title from "../components/Title";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import {
  setStandingsEng,
  setStandingsSpa,
  setStandingsIta,
} from "../context/slices/statsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { getFixtures, getStandings } from "../services/stats";
import StatsTable from "../components/StatsTable";
import StatsSchedule from "../components/StatsSchedule";

export default function StatsScreen({
  navigation,
  route,
}: RootTabScreenProps<"StatsTable">) {
  const [activeTab, setActiveTab] = useState("Schedule");
  const dispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.stats);
  // const [fixtures, setFixtures] = useState<any>([]);

  function activeTabHandler(tab: string) {
    setActiveTab(tab);
  }

  useEffect(() => {
    // get Standings
    if (stats.selectedLeague === "Premier League") {
      if (!stats.standingsEng.fetched) {
        axios
          .request(getStandings(stats.selectedLeague))
          .then(function (response) {
            console.log(response.data);
            dispatch(
              setStandingsEng({
                standings: response.data,
              })
            );
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
    if (stats.selectedLeague === "La Liga") {
      if (!stats.standingsSpa.fetched) {
        axios
          .request(getStandings(stats.selectedLeague))
          .then(function (response) {
            console.log(response.data);
            dispatch(
              setStandingsSpa({
                standings: response.data,
              })
            );
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
    if (stats.selectedLeague === "Serie A") {
      if (!stats.standingsIta.fetched) {
        axios
          .request(getStandings(stats.selectedLeague))
          .then(function (response) {
            console.log(response.data);
            dispatch(
              setStandingsIta({
                standings: response.data,
              })
            );
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
  }, []);

  return (
    <Container>
      <Title>{route.params ? route.params.league : "League"}</Title>
      <Tabs
        tab1="Schedule"
        tab2="Tables"
        activeTab={activeTab}
        onPress={activeTabHandler}
      />
      {activeTab === "Schedule" ? <StatsSchedule /> : <StatsTable />}
    </Container>
  );
}
