import { useState } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { colors } from "../constants/Colors";
import { RootTabScreenProps } from "../types";
import Title from "../components/Title";
import Tabs from "../components/Tabs";
import Container from "../components/Container";
import LeagueCard from "../components/LeagueCard";

const data = [
  { id: "1", name: "Premier League" },
  { id: "2", name: "Bundesliga" },
  { id: "3", name: "La Liga" },
  { id: "4", name: "Ekstraklasa" },
  { id: "5", name: "Serie A" },
  { id: "6", name: "Atland" },
  { id: "7", name: "Create new" },
];

export default function SimulatorScreen({
  navigation,
}: RootTabScreenProps<"Simulator">) {
  const [activeTab, setActiveTab] = useState("New");

  function navigateHandler(league: string) {
    navigation.navigate("SimulatorList", {
      league: league,
    });
  }

  function activeTabHandler(tab: string) {
    setActiveTab(tab);
  }
  return (
    <Container>
      <Title>Choose your league</Title>
      <Tabs
        tab1="New"
        tab2="Saved"
        activeTab={activeTab}
        onPress={activeTabHandler}
      />
      <FlatList
        data={data}
        renderItem={(itemData) => (
          <LeagueCard
            name={itemData.item.name}
            onPress={() => navigateHandler(itemData.item.name)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />

      {/* <Button title="List" onPress={pressHandler} /> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  leaguesContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "red",
  },
  leagueItem: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    height: 150,
    width: 150,
    borderRadius: 8,
    elevation: 4,
  },
  leagueText: {
    fontSize: 16,
    fontFamily: "baloo",
    color: colors.white,
  },
  loading: {
    color: colors.white,
  },
});
