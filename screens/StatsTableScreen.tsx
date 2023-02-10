import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Title from "../components/Title";
import { colors } from "../constants/Colors";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import {
  setStandingsEng,
  setStandingsSpa,
  setStandingsIta,
} from "../context/slices/statsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { RAPID_API } from "@env";

export default function StatsScreen({
  navigation,
  route,
}: RootTabScreenProps<"StatsTable">) {
  const [activeTab, setActiveTab] = useState("Schedule");
  const dispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.stats);
  const [tables, setTables] = useState<any>([]);

  function activeTabHandler(tab: string) {
    setActiveTab(tab);
  }

  function getOptions(league: string) {
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
    console.log("options", options);
    return options;
  }

  useEffect(() => {
    console.log("start effect");
    console.log("stats in effect 1", stats);
    if (stats.selectedLeague === "Premier League") {
      if (!stats.standingsEng.fetched) {
        console.log("is empty");
        axios
          .request(getOptions(stats.selectedLeague))
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
        console.log("is empty Spain");
        axios
          .request(getOptions(stats.selectedLeague))
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
        console.log("is empty Italy");
        axios
          .request(getOptions(stats.selectedLeague))
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

  console.log("stats", stats);
  // console.log("stats standings", stats.standings);
  // console.log("stats standings res", stats.standings.response);
  // console.log("stats standings res stand", stats.standings.response[0]);
  // console.log(
  //   "stats standings res stand league",
  //   stats.standings.response[0].league
  // );
  // console.log(
  //   "stats standings res stand league stan[0]",
  //   stats.standings.response[0].league.standings[0]
  // );
  // stats.standings.response[0].league.standings[0].map((item: any, i: any) =>
  //   //console.log(`Team ${i}:`, item)
  //   setStandings((prev: any) => [...prev, item])
  // );
  // // console.log(
  //   "stats standings res stand league stan[0]",
  //   stats.standings.response[0].league.standings[0]
  // );

  useEffect(() => {
    setTables([]);
    if (
      stats.selectedLeague === "Premier League" &&
      stats.standingsEng.response
    ) {
      stats?.standingsEng?.response[0].league.standings[0].map(
        (item: any, i: any) =>
          //console.log(`Team ${i}:`, item)
          setTables((prev: any) => [...prev, item])
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
            <Text style={styles.text}>Round 5</Text>
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
          {/* <View style={[styles.tableRow, styles.tableRowOdd]}>
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
          </View> */}
          {/* <View style={[styles.tableRow, styles.tableRowEven]}>
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
          </View> */}
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
