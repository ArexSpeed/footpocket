import { LinearGradient } from "expo-linear-gradient";
import { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Modal,
} from "react-native";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Title from "../components/Title";
import { RootTabScreenProps } from "../types";
import { colors } from "../constants/Colors";
import typerData from "../data/typer.json";

interface Table {
  userId: string;
  userName: string;
  points: number;
}

export default function TyperLeagueScreen({
  navigation,
  route,
}: RootTabScreenProps<"TyperLeague">) {
  const [activeTab, setActiveTab] = useState("Tables");
  const [betModal, setBetModal] = useState(false);
  const [gameDetailModal, setGameDetailModal] = useState(false);
  const [tableData, setTableData] = useState<Table[] | undefined>([]);

  useLayoutEffect(() => {
    if (route.params?.league) {
      const selectedMembers = typerData.find(
        (item) => item.leagueName === route.params?.league
      );
      setTableData(selectedMembers?.table);
    }
  }, [route]);

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
        <ScrollView style={styles.tableContainer}>
          {/* Round1 */}
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.roundRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.text}>Round 1</Text>
            <Pressable style={styles.playBtn} onPress={() => setBetModal(true)}>
              <Text style={styles.text}>Bet</Text>
            </Pressable>
          </LinearGradient>
          {/* VS */}
          <Pressable onPress={() => setGameDetailModal(true)}>
            <LinearGradient
              colors={[colors.blue, colors.black]}
              style={styles.gameRow}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.text}>Manchester United</Text>
              <View style={styles.bets}>
                <View style={styles.betsScore}>
                  <Text style={styles.text}>2</Text>
                  <Text style={styles.text}>0</Text>
                </View>
                <Text style={styles.thsmall}>Your bet:</Text>
                <View style={styles.betsScore}>
                  <Text style={styles.text}>2</Text>
                  <Text style={styles.text}>0</Text>
                </View>
              </View>
              <Text style={styles.text}>Manchester United</Text>
            </LinearGradient>
          </Pressable>
          <LinearGradient
            colors={[colors.black, colors.blue]}
            style={styles.gameRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.text}>Manchester United</Text>
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>Manchester United</Text>
          </LinearGradient>
        </ScrollView>
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
          {tableData?.map((item, i) => (
            <View
              key={item.userId}
              style={[
                styles.tableRow,
                i % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven,
              ]}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.tr}>{i + 1}</Text>
                <Text style={styles.tr}>{item.userName}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.trSmall}>15</Text>
                <Text style={styles.tr}>{item.points}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      {/* Modal for BET */}
      <Modal visible={betModal}>
        <View style={styles.modalView}>
          <View style={styles.betGameColumn}>
            <View style={styles.betGameRow}>
              <Text style={styles.text}>Manchester United</Text>
              <Text style={styles.text}>Manchester United</Text>
            </View>
            <View style={styles.betGameRow}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreBoxValue}>0</Text>
              </View>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreBoxValue}>0</Text>
              </View>
            </View>
          </View>
          <View style={styles.betGameColumn}>
            <View style={styles.betGameRow}>
              <Text style={styles.text}>Manchester United</Text>
              <Text style={styles.text}>Manchester United</Text>
            </View>
            <View style={styles.betGameRow}>
              <View style={styles.scoreBox}>
                <Pressable style={styles.minus}>
                  <Text style={styles.btnText}>-</Text>
                </Pressable>
                <Text style={styles.scoreBoxValue}>0</Text>
                <Pressable style={styles.plus}>
                  <Text style={styles.btnText}>+</Text>
                </Pressable>
              </View>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreBoxValue}>0</Text>
              </View>
            </View>
          </View>
          <View style={styles.modalButtons}>
            <Pressable
              style={styles.updateBtn}
              onPress={() => setBetModal(false)}
            >
              <Text style={styles.startText}>SAVE</Text>
            </Pressable>
            <Pressable
              style={styles.cancelBtn}
              onPress={() => setBetModal(false)}
            >
              <Text style={styles.startText}>EXIT</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal for details of meeting bets */}
      <Modal visible={gameDetailModal}>
        <View style={styles.modalView}>
          <Title>Round 1 Detail</Title>
          <View style={styles.betGameColumn}>
            <View style={styles.betGameRow}>
              <Text style={styles.text}>Manchester United</Text>
              <Text style={styles.text}>Manchester United</Text>
            </View>
            <View style={styles.betGameRow}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreBoxValue}>2</Text>
              </View>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreBoxValue}>0</Text>
              </View>
            </View>
          </View>
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
                <Text style={styles.thsmall}>Bet</Text>
                <Text style={styles.th}>PT</Text>
              </View>
            </LinearGradient>
            <View style={[styles.tableRow, styles.tableRowOdd]}>
              <View style={styles.rowContainer}>
                <Text style={styles.tr}>1</Text>
                <Text style={styles.tr}>Speed</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.tr}>2:0</Text>
                <Text style={styles.tr}>3</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.tableRowEven]}>
              <View style={styles.rowContainer}>
                <Text style={styles.tr}>2</Text>
                <Text style={styles.tr}>Arex95</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.tr}>1:0</Text>
                <Text style={styles.tr}>2</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.modalButtons}>
            <Pressable
              style={styles.updateBtn}
              onPress={() => setGameDetailModal(false)}
            >
              <Text style={styles.startText}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  // Scores
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
  // Bets Score
  bets: {
    flexDirection: "column",
  },
  betsScore: {
    flexDirection: "row",
    justifyContent: "space-around",
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
  // Modal Bet
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    color: colors.white,
    width: "100%",
  },
  betGameColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    margin: 8,
    width: "100%",
    borderRadius: 8,
    backgroundColor: colors.black,
  },
  betGameRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 4,
    width: "100%",
  },
  scoreBetRow: {
    flexDirection: "row",
  },
  scoreBox: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkgray,
    borderRadius: 4,
    elevation: 4,
  },
  scoreBoxValue: {
    fontSize: 24,
    fontFamily: "baloo-bold",
    color: colors.white,
  },
  plus: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    color: colors.white,
    width: 20,
    height: 20,
    marginLeft: 4,
    borderRadius: 4,
  },
  minus: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
    color: colors.white,
    width: 20,
    height: 20,
    marginRight: 4,
    borderRadius: 4,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "baloo-bold",
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtn: {
    backgroundColor: colors.lightblue,
    padding: 8,
    borderRadius: 8,
    margin: 4,
  },
  cancelBtn: {
    backgroundColor: colors.red,
    padding: 8,
    borderRadius: 8,
    margin: 4,
  },
  startText: {
    fontSize: 24,
    fontFamily: "baloo-bold",
    color: colors.black,
  },
});
