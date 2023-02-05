import { StyleSheet, FlatList } from "react-native";
import { RootTabScreenProps } from "../types";
import Container from "../components/Container";
import Title from "../components/Title";
import LeagueCard from "../components/LeagueCard";

const data = [
  { id: "1", name: "Premier League" },
  { id: "2", name: "La Liga" },
  { id: "3", name: "Serie A" },
];

export default function StatsScreen({
  navigation,
}: RootTabScreenProps<"Stats">) {
  function navigateHandler(league: string) {
    navigation.navigate("StatsTable", {
      league: league,
    });
  }
  return (
    <Container>
      <Title>Choose league</Title>
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
    </Container>
  );
}

const styles = StyleSheet.create({});
