import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/Colors";
interface Props {
  game: Game;
}

type Game = {
  gameId: string;
  host: string;
  guest: string;
};

function BetRow({ game }: Props) {
  const [hostScore, setHostScore] = useState(0);
  const [guestScore, setGuestScore] = useState(0);
  return (
    <View style={styles.betGameColumn}>
      <View style={styles.betGameRow}>
        <Text style={styles.text}>{game.host}</Text>
        <Text style={styles.text}>{game.guest}</Text>
      </View>
      <View style={styles.betGameRow}>
        <View style={styles.scoreBox}>
          <Pressable
            style={styles.minus}
            onPress={() => setHostScore((prev) => prev - 1)}
          >
            <Text style={styles.btnText}>-</Text>
          </Pressable>
          <Text style={styles.scoreBoxValue}>{hostScore}</Text>
          <Pressable
            style={styles.plus}
            onPress={() => setHostScore((prev) => prev + 1)}
          >
            <Text style={styles.btnText}>+</Text>
          </Pressable>
        </View>
        <View style={styles.scoreBox}>
          <Pressable
            style={styles.minus}
            onPress={() => setGuestScore((prev) => prev - 1)}
          >
            <Text style={styles.btnText}>-</Text>
          </Pressable>
          <Text style={styles.scoreBoxValue}>{guestScore}</Text>
          <Pressable
            style={styles.plus}
            onPress={() => setGuestScore((prev) => prev + 1)}
          >
            <Text style={styles.btnText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default BetRow;

const styles = StyleSheet.create({
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
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "baloo-bold",
  },
});
