import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Title from "../components/Title";
import { colors } from "../constants/Colors";
import { playGame, updateTable } from "../context/slices/simulatorSlice";
import { RootState } from "../context/store";
import { RootTabScreenProps } from "../types";

type Team = {
  id: string;
  name: string;
  att: number;
  mid: number;
  def: number;
};
interface Round {
  round: number;
  games: {
    round: number;
    id: string;
    host: Team;
    hostScore: number;
    guest: Team;
    guestScore: number;
    isPlayed: boolean;
  }[];
}

export default function SimulatorGameScreen({
  navigation,
}: RootTabScreenProps<"SimulatorGame">) {
  const [activeTab, setActiveTab] = useState("Schedule");
  const { league, teams, table, schedule } = useSelector(
    (state: RootState) => state.simulator
  );
  const dispatch = useDispatch();

  function activeTabHandler(tab: string) {
    setActiveTab(tab);
  }

  //console.log("schedule", schedule);
  // console.log("table", table);

  function play(host: Team, guest: Team, gameId: string, round: number) {
    console.log("play", host, guest);
    let hc = 0.01;
    let point = 0;

    let h_a = host.att + host.att * hc + Math.floor(Math.random() * 10);
    let h_p = host.mid + host.mid * hc + Math.floor(Math.random() * 10);
    let h_o = host.def + host.def * hc + Math.floor(Math.random() * 10);
    let g_a = guest.att + Math.floor(Math.random() * 10);
    let g_p = guest.mid + Math.floor(Math.random() * 10);
    let g_o = guest.def + Math.floor(Math.random() * 10);
    let shot = (h_a + h_p) / 9.75;
    let saves = (g_p + g_o) / 10;
    let score1 = Math.floor(shot - saves) + Math.floor(Math.random() * 2);
    let shot2 = (g_a + g_p) / 9.75;
    let saves2 = (h_p + h_o) / 10;
    let score2 = Math.floor(shot2 - saves2) + Math.floor(Math.random() * 2);

    if (score1 < 0) {
      score1 = 0 + Math.floor(Math.random() * 2);
    }
    if (score2 < 0) {
      score2 = 0 + Math.floor(Math.random() * 2);
    }

    let hostTable = {
      games: 1,
      win: 0,
      draw: 0,
      loses: 0,
      goalPlus: score1,
      goalMinus: score2,
      points: 0,
    };
    let guestTable = {
      games: 1,
      win: 0,
      draw: 0,
      loses: 0,
      goalPlus: score2,
      goalMinus: score1,
      points: 0,
    };

    if (score1 > score2) {
      hostTable.points = 3;
      guestTable.points = 0;
      hostTable.win = 1;
      guestTable.loses = 1;
    } else if (score1 < score2) {
      guestTable.points = 3;
      hostTable.points = 0;
      guestTable.win = 1;
      hostTable.loses = 1;
    } else if (score1 == score2) {
      hostTable.points = 1;
      guestTable.points = 1;
      hostTable.draw = 1;
      guestTable.draw = 1;
    }

    // console.log("scores: ", score1, score2);
    dispatch(
      playGame({
        round,
        gameId,
        hostScore: score1,
        guestScore: score2,
      })
    );
    dispatch(
      updateTable({
        host,
        guest,
        hostTable,
        guestTable,
      })
    );
  }
  return (
    <Container>
      <Title>{league}</Title>
      <Tabs
        tab1="Schedule"
        tab2="Tables"
        activeTab={activeTab}
        onPress={activeTabHandler}
      />
      {activeTab === "Schedule" ? (
        <ScrollView style={styles.schedule}>
          {schedule.map((round: Round) => (
            <View key={round.round}>
              <LinearGradient
                colors={colors.primaryGradient}
                style={styles.roundRow}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.text}>Round {round.round}</Text>
                {/* <Pressable style={styles.playBtn}>
                  <Text style={styles.text}>Play All</Text>
                </Pressable> */}
              </LinearGradient>
              {round.games.map((game, i) => (
                <View
                  style={[
                    styles.gameRow,
                    i % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven,
                  ]}
                  key={i}
                >
                  <View style={styles.gameRowText}>
                    <Text style={styles.text}>{game.host.name}</Text>
                  </View>
                  {game.isPlayed ? (
                    <View style={styles.scoreRow}>
                      <Text style={styles.text}>{game.hostScore}</Text>
                      <Text style={styles.text}> : </Text>
                      <Text style={styles.text}>{game.guestScore}</Text>
                    </View>
                  ) : (
                    <View style={styles.scoreRow}>
                      <Pressable
                        onPress={() =>
                          play(game.host, game.guest, game.id, game.round)
                        }
                      >
                        <Text style={styles.textPlay}>Play</Text>
                      </Pressable>
                    </View>
                  )}
                  <View style={styles.gameRowTextEnd}>
                    <Text style={styles.text}>{game.guest.name}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
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
          {table.map((team, i) => (
            <View
              key={i}
              style={[
                styles.tableRow,
                i % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven,
              ]}
            >
              <View style={styles.tableContainer}>
                <Text style={styles.tr}>{i + 1}</Text>
                <Text style={styles.tr}>{team.name}</Text>
              </View>
              <View style={styles.tableContainer}>
                <Text style={styles.trSmall}>{team.games}</Text>
                <Text style={styles.trSmall}>{team.win}</Text>
                <Text style={styles.trSmall}>{team.draw}</Text>
                <Text style={styles.trSmall}>{team.loses}</Text>
                <Text style={styles.trSmall}>{team.goalPlus}</Text>
                <Text style={styles.trSmall}>{team.goalMinus}</Text>
                <Text style={styles.tr}>{team.points}</Text>
              </View>
            </View>
          ))}
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
    marginTop: 8,
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
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  gameRowText: {
    width: "40%",
  },
  gameRowTextEnd: {
    width: "40%",
    alignItems: "flex-end",
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "baloo-bold",
  },
  textPlay: {
    color: colors.lightblue,
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
