import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  FlatList,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/Colors";
import { RootTabScreenProps } from "../types";

interface LeagueItem {
  name: string;
}

const data = [
  { id: "1", name: "Premier League" },
  { id: "2", name: "Bundesliga" },
  { id: "3", name: "La Liga" },
  { id: "4", name: "Ekstraklasa" },
  { id: "5", name: "Serie A" },
  { id: "6", name: "Atland" },
  { id: "7", name: "Create new" },
];

function LeagueItem({ name }: LeagueItem) {
  return (
    <LinearGradient
      colors={colors.primaryGradient}
      style={styles.leagueItem}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <View></View>
      <Text style={styles.leagueText}>{name}</Text>
    </LinearGradient>
  );
}

function LeagueItemAdd() {
  return (
    <View style={styles.leagueItem}>
      <View></View>
      <Text style={styles.leagueText}>Create new</Text>
    </View>
  );
}

export default function SimulatorScreen({
  navigation,
}: RootTabScreenProps<"Simulator">) {
  const [activeTab, setActiveTab] = useState("New");

  function pressHandler() {
    navigation.navigate("SimulatorList");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your league game</Text>
      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, activeTab === "New" && styles.tabActive]}
          onPress={() => setActiveTab("New")}
        >
          <Text style={styles.tabText}>NEW</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "Saved" && styles.tabActive]}
          onPress={() => setActiveTab("Saved")}
        >
          <Text style={styles.tabText}>SAVED</Text>
        </Pressable>
      </View>
      {/* <View style={styles.leaguesContainer}> */}
      <FlatList
        data={data}
        renderItem={(itemData) => <LeagueItem name={itemData.item.name} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      {/* </View> */}
      <Button title="List" onPress={pressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.background,
    color: colors.white,
  },
  title: {
    fontFamily: "baloo",
    fontSize: 24,
    color: colors.white,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 4,
    padding: 2,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    margin: 4,
    borderRadius: 4,
    backgroundColor: "transparent",
  },
  tabActive: {
    backgroundColor: colors.secondary,
  },
  tabText: {
    fontFamily: "baloo",
    color: colors.white,
    fontSize: 24,
  },
  leaguesContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "red",
  },
  leagueItem: {
    // flex: 0.5,
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
});
