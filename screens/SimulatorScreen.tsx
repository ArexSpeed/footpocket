import { useState } from "react";
import { FlatList } from "react-native";
import { RootTabScreenProps } from "../types";
import Title from "../components/Title";
import Tabs from "../components/Tabs";
import Container from "../components/Container";
import LeagueCard from "../components/LeagueCard";
import data from "../data/teams.json";
import { useDispatch } from "react-redux";
import { setLeague } from "../context/slices/simulatorSlice";

export default function SimulatorScreen({
  navigation,
}: RootTabScreenProps<"Simulator">) {
  const [activeTab, setActiveTab] = useState("New");
  const dispatch = useDispatch();

  const randId = Math.floor(Math.random() * 10000).toString();

  const ownLeagueData = {
    leagueId: randId,
    leagueName: "Create own league",
    teams: [],
  };

  function navigateHandler(league: string) {
    dispatch(
      setLeague({
        league: league,
      })
    );
    navigation.navigate("SimulatorList", {
      league: league,
    });
  }

  function activeTabHandler(tab: string) {
    setActiveTab(tab);
  }
  return (
    <Container>
      <Title>Choose your game</Title>
      <Tabs
        tab1="New"
        tab2="Saved"
        activeTab={activeTab}
        onPress={activeTabHandler}
      />
      <FlatList
        data={[...data, ownLeagueData]}
        renderItem={(itemData) => (
          <LeagueCard
            name={itemData.item.leagueName}
            onPress={() => navigateHandler(itemData.item.leagueName)}
          />
        )}
        keyExtractor={(item) => item.leagueId}
        numColumns={2}
      />
    </Container>
  );
}
