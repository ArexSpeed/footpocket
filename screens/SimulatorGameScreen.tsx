import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { colors } from "../constants/Colors";
import { RootTabScreenProps } from "../types";

export default function SimulatorGameScreen({
  navigation,
}: RootTabScreenProps<"SimulatorGame">) {
  const [view, setView] = useState("Schedule");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premier League</Text>
      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, view === "Schedule" && styles.tabActive]}
          onPress={() => setView("Schedule")}
        >
          <Text style={styles.tabText}>SCHEDULE</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, view === "STANDING" && styles.tabActive]}
          onPress={() => setView("STANDING")}
        >
          <Text style={styles.tabText}>STANDING</Text>
        </Pressable>
      </View>
      {view === "Schedule" ? (
        <ScrollView style={styles.schedule}>
          {/* Round1 */}
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.roundRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.text}>Round 1</Text>
            <Pressable style={styles.playBtn}>
              <Text style={styles.text}>Play All</Text>
            </Pressable>
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
            <Pressable>
              <Text style={styles.text}>Play</Text>
            </Pressable>
            <Text style={styles.text}>Manchester United</Text>
          </LinearGradient>
          {/* <View style={styles.gameRow}>
        <Text style={styles.text}>Manchester United</Text>
        <Pressable>
          <Text style={styles.text}>Play</Text>
        </Pressable>
        <Text style={styles.text}>Manchester United</Text>
      </View> */}
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
    fontFamily: "baloo-bold",
    color: colors.white,
    fontSize: 24,
  },
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
