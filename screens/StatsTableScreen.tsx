import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Title from "../components/Title";
import { colors } from "../constants/Colors";
import { RootTabScreenProps } from "../types";

export default function StatsScreen({
  navigation,
  route,
}: RootTabScreenProps<"StatsTable">) {
  const [activeTab, setActiveTab] = useState("Schedule");

  function activeTabHandler(tab: string) {
    setActiveTab(tab);
  }
  return (
    <Container>
      <Title>{route.params ? route.params.league : "League"}</Title>
      <Tabs
        tab1="Schedule"
        tab2="Tables"
        activeTab={activeTab}
        onPress={activeTabHandler}
      />
      {activeTab === "Schedule" ? (
        <ScrollView style={styles.schedule}>
          {/* Round1 */}
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.roundRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.text}>Round 1</Text>
          </LinearGradient>
          {/* VS */}
          <LinearGradient
            colors={[colors.blue, colors.black]}
            style={styles.gameRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.text}>Manchester United</Text>
            <Text style={styles.text}>2</Text>
            <Text style={styles.text}>0</Text>
            <Text style={styles.text}>Manchester United</Text>
          </LinearGradient>
          <LinearGradient
            colors={[colors.black, colors.blue]}
            style={styles.gameRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.text}>Manchester United</Text>
            <Text style={styles.text}>2</Text>
            <Text style={styles.text}>0</Text>
            <Text style={styles.text}>Manchester United</Text>
          </LinearGradient>
        </ScrollView>
      ) : (
        <ScrollView style={styles.schedule}>
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.tableRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <View style={styles.tableContainer}>
              <Text style={styles.th}>#</Text>
              <Text style={styles.th}>Team</Text>
            </View>
            <View style={styles.tableContainer}>
              <Text style={styles.thsmall}>M</Text>
              <Text style={styles.thsmall}>W</Text>
              <Text style={styles.thsmall}>D</Text>
              <Text style={styles.thsmall}>P</Text>
              <Text style={styles.thsmall}>G+</Text>
              <Text style={styles.thsmall}>G-</Text>
              <Text style={styles.th}>PT</Text>
            </View>
          </LinearGradient>
          <View style={[styles.tableRow, styles.tableRowOdd]}>
            <View style={styles.tableContainer}>
              <Text style={styles.tr}>1</Text>
              <Text style={styles.tr}>Manchester United</Text>
            </View>
            <View style={styles.tableContainer}>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.tr}>30</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.tableRowEven]}>
            <View style={styles.tableContainer}>
              <Text style={styles.tr}>1</Text>
              <Text style={styles.tr}>Manchester United</Text>
            </View>
            <View style={styles.tableContainer}>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.trSmall}>10</Text>
              <Text style={styles.tr}>30</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  schedule: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    width: "100%",
  },
  roundRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  playBtn: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: colors.blue,
  },
  gameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "baloo-bold",
  },
  // Table
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
  tableContainer: {
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
