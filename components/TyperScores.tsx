import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, ScrollView, View, Text, Pressable } from "react-native";
import { colors } from "../constants/Colors";
import data from "../data/typerScores.json";
import BetRoundModal from "./modals/BetRoundModal";
import TyperGameDetailModal from "./modals/TyperGameDetailModal";

type GameDetail = {
  gameId: string;
  host: string;
  guest: string;
  hostScore: number;
  guestScore: number;
  hostBet: number;
  guestBet: number;
};

function TyperScores() {
  const [betModal, setBetModal] = useState(false);
  const [gameDetailModal, setGameDetailModal] = useState(false);
  const [gameData, setGameData] = useState<GameDetail>();

  function openModal(game: GameDetail) {
    setGameData(game);
    setGameDetailModal(true);
  }
  console.log("data", data);
  return (
    <>
      <ScrollView style={styles.tableContainer}>
        {/* Round1 */}
        {data.map((item, i) => (
          <View key={i}>
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.roundRow}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.text}>Round {item.round}</Text>
              <Pressable
                style={styles.playBtn}
                onPress={() => setBetModal(true)}
              >
                <Text style={styles.text}>Bet</Text>
              </Pressable>
            </LinearGradient>
            {item?.games.map((game, i) => (
              <Pressable key={i} onPress={() => openModal(game)}>
                <View
                  style={[
                    styles.gameRow,
                    i % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven,
                  ]}
                >
                  <View style={styles.gameRowText}>
                    <Text style={styles.text}>{game.host}</Text>
                  </View>
                  <View style={styles.bets}>
                    <View style={styles.betsScore}>
                      <Text style={styles.text}>{game.hostScore}</Text>
                      <Text style={styles.text}>{game.guestScore}</Text>
                    </View>
                    <Text style={styles.thsmall}>Your bet:</Text>
                    <View style={styles.betsScore}>
                      <Text style={styles.text}>{game.hostBet}</Text>
                      <Text style={styles.text}>{game.guestBet}</Text>
                    </View>
                  </View>

                  <View style={styles.gameRowTextEnd}>
                    <Text style={styles.text}>{game.guest}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
      <TyperGameDetailModal
        game={gameData}
        gameDetailModal={gameDetailModal}
        setGameDetailModal={setGameDetailModal}
      />
      <BetRoundModal betModal={betModal} setBetModal={setBetModal} />
    </>
  );
}

export default TyperScores;

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
  // Bets Score
  bets: {
    flexDirection: "column",
  },
  betsScore: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  thsmall: {
    color: colors.gray,
    fontSize: 12,
    fontFamily: "baloo",
    paddingHorizontal: 4,
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
});
