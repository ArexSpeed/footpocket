import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../constants/Colors";
import { RootState } from "../context/store";

interface Table {
  team: {
    name: string;
  };
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  points: number;
}

function StatsTable() {
  const stats = useSelector((state: RootState) => state.stats);
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    setTables([]);
    if (
      stats.selectedLeague === "Premier League" &&
      stats.standingsEng.response
    ) {
      stats?.standingsEng?.response[0].league.standings[0].map(
        (item: any, i: any) => setTables((prev: any) => [...prev, item])
      );
    }
    if (stats.selectedLeague === "La Liga" && stats.standingsSpa.response) {
      stats?.standingsSpa?.response[0].league.standings[0].map(
        (item: any, i: any) => setTables((prev: any) => [...prev, item])
      );
    }
    if (stats.selectedLeague === "Serie A" && stats.standingsIta.response) {
      stats?.standingsIta?.response[0].league.standings[0].map(
        (item: any, i: any) => setTables((prev: any) => [...prev, item])
      );
    }
  }, [stats]);
  return (
    <ScrollView style={styles.scrollContainer}>
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
      {tables?.map((item: any, i: any) => (
        <View
          key={i}
          style={[
            styles.tableRow,
            i % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven,
          ]}
        >
          <View style={styles.tableContainer}>
            <Text style={styles.tr}>{i + 1}</Text>
            <Text style={styles.tr}>{item.team.name}</Text>
          </View>
          <View style={styles.tableContainer}>
            <Text style={styles.trSmall}>{item.all.played}</Text>
            <Text style={styles.trSmall}>{item.all.win}</Text>
            <Text style={styles.trSmall}>{item.all.draw}</Text>
            <Text style={styles.trSmall}>{item.all.lose}</Text>
            <Text style={styles.trSmall}>{item.all.goals.for}</Text>
            <Text style={styles.trSmall}>{item.all.goals.against}</Text>
            <Text style={styles.tr}>{item.points}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default StatsTable;

const styles = StyleSheet.create({
  scrollContainer: {
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
