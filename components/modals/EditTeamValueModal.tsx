import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../../constants/Colors";

function EditTeamValueModal({
  editModal,
  setEditModal,
  editTeamValue,
  setEditTeamValue,
  updateTeamHandler,
}: any) {
  return (
    <Modal visible={editModal}>
      <View style={styles.modalView}>
        <View style={styles.label}>
          <Text style={styles.labelTitle}>Team name:</Text>
          <TextInput style={styles.labelInput} value={editTeamValue.name} />
        </View>
        <View style={styles.skillBox}>
          <Text style={styles.skillBoxTitle}>Forward:</Text>
          <Text style={styles.skillBoxValue}>{editTeamValue.att}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            maximumTrackTintColor="#FFFFFF"
            value={editTeamValue.att}
            onValueChange={(value) =>
              setEditTeamValue({ ...editTeamValue, att: value })
            }
          />
        </View>
        <View style={styles.skillBox}>
          <Text style={styles.skillBoxTitle}>Midfield:</Text>
          <Text style={styles.skillBoxValue}>{editTeamValue.mid}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            maximumTrackTintColor="#FFFFFF"
            value={editTeamValue.mid}
            onValueChange={(value) =>
              setEditTeamValue({ ...editTeamValue, mid: value })
            }
          />
        </View>
        <View style={styles.skillBox}>
          <Text style={styles.skillBoxTitle}>Defence:</Text>
          <Text style={styles.skillBoxValue}>{editTeamValue.def}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            maximumTrackTintColor="#FFFFFF"
            value={editTeamValue.def}
            onValueChange={(value) =>
              setEditTeamValue({ ...editTeamValue, def: value })
            }
          />
        </View>
        <View style={styles.modalButtons}>
          <Pressable style={styles.updateBtn} onPress={updateTeamHandler}>
            <Text style={styles.startText}>UPDATE</Text>
          </Pressable>
          <Pressable
            style={styles.cancelBtn}
            onPress={() => setEditModal(false)}
          >
            <Text style={styles.startText}>CANCEL</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default EditTeamValueModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    color: colors.white,
  },
  slider: {
    width: 200,
    height: 48,
  },
  label: {
    flexDirection: "column",
    width: "100%",
    padding: 8,
  },
  labelTitle: {
    fontSize: 16,
    fontFamily: "baloo",
    color: colors.gray,
  },
  labelInput: {
    fontFamily: "baloo-bold",
    fontSize: 20,
    padding: 8,
    color: colors.white,
    backgroundColor: colors.darkgray,
    borderRadius: 8,
  },
  skillBox: {
    flexDirection: "column",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkgray,
    borderRadius: 4,
    elevation: 4,
    margin: 8,
  },
  skillBoxTitle: {
    fontSize: 16,
    fontFamily: "baloo",
    color: colors.gray,
  },
  skillBoxValue: {
    fontSize: 32,
    fontFamily: "baloo-bold",
    color: colors.white,
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
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
