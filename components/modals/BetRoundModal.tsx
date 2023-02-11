import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { colors } from "../../constants/Colors";
import BetRow from "../BetRow";
import Title from "../Title";
import data from "../../data/typerBet.json";

interface Props {
  betModal: boolean;
  setBetModal: (value: boolean) => void;
}

type Game = {
  gameId: string;
  host: string;
  guest: string;
};

function BetRoundModal({ betModal, setBetModal }: Props) {
  return (
    <Modal visible={betModal}>
      <ScrollView>
        <View style={styles.modalView}>
          <Title>Round 2</Title>
          {data.map((game: Game) => (
            <BetRow key={game.gameId} game={game} />
          ))}

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
      </ScrollView>
    </Modal>
  );
}

export default BetRoundModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    color: colors.white,
    width: "100%",
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
