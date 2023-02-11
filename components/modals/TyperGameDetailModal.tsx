import { LinearGradient } from "expo-linear-gradient";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { colors } from "../../constants/Colors";
import Title from "../Title";

function TyperGameDetailModal({
  game,
  gameDetailModal,
  setGameDetailModal,
}: any) {
  return (
    <Modal visible={gameDetailModal}>
      <View style={styles.modalView}>
        <Title>Game Detail</Title>
        <View style={styles.betGameColumn}>
          <View style={styles.betGameRow}>
            <Text style={styles.text}>{game?.host}</Text>
            <Text style={styles.text}>{game?.guest}</Text>
          </View>
          <View style={styles.betGameRow}>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreBoxValue}>{game?.hostScore}</Text>
            </View>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreBoxValue}>{game?.guestScore}</Text>
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
  );
}

export default TyperGameDetailModal;

const styles = StyleSheet.create({
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
  // Table
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
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "baloo-bold",
  },
});
