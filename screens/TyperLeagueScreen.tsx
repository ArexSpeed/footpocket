import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Title from "../components/Title";
import { RootTabScreenProps } from "../types";
import { colors } from "../constants/Colors";

export default function TyperLeagueScreen({
  navigation,
  route,
}: RootTabScreenProps<"TyperLeague">) {
  const [activeTab, setActiveTab] = useState("Scores");

  function activeTabHandler(tab: string) {
    setActiveTab(tab);
  }
  return (
    <Container>
      <Title>{route.params ? route.params.league : "Typer League"}</Title>
      <Tabs
        tab1="Scores"
        tab2="Tables"
        activeTab={activeTab}
        onPress={activeTabHandler}
      />
      {activeTab === "Scores" ? (
        <></>
      ) : (
        <ScrollView style={styles.tableContainer}>
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.tableRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.th}>#</Text>
              <Text style={styles.th}>Name</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.thsmall}>Last</Text>
              <Text style={styles.th}>PT</Text>
            </View>
          </LinearGradient>
          <View style={[styles.tableRow, styles.tableRowOdd]}>
            <View style={styles.rowContainer}>
              <Text style={styles.tr}>1</Text>
              <Text style={styles.tr}>Speed</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.trSmall}>15</Text>
              <Text style={styles.tr}>310</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.tableRowEven]}>
            <View style={styles.rowContainer}>
              <Text style={styles.tr}>2</Text>
              <Text style={styles.tr}>Arex95</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.tr}>302</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
  tableRowOdd: {
    backgroundColor: colors.black,
  },
  tableRowEven: {
    backgroundColor: colors.darkgray,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  th: {
    color: colors.gray,
    fontSize: 16,
    fontFamily: "baloo",
    paddingHorizontal: 4,
  },
  thsmall: {
    color: colors.gray,
    fontSize: 12,
    fontFamily: "baloo",
    paddingHorizontal: 4,
  },
  tr: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "baloo-bold",
    paddingHorizontal: 4,
  },
  trSmall: {
    color: colors.white,
    fontSize: 12,
    fontFamily: "baloo-bold",
    paddingHorizontal: 4,
  },
});
