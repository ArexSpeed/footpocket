import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TextInput } from "react-native";
import { colors } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUserName } from "../context/slices/userSlice";
import { RootState } from "../context/store";
import { createUser, fetchUser, updateUser } from "../services/users";

function UserCard() {
  const user = useSelector((state: RootState) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [editProfileValues, setEditProfileValues] = useState({
    imageUrl: "",
    nickname: user.userName ? user.userName : "",
  });
  const dispatch = useDispatch();

  function editProfile() {
    setOpenModal(true);
  }

  async function updateUserData() {
    if (user.userName) {
      const userKey = await fetchUser(user.userName ? user.userName : "");
      const payload = {
        id: user.userId ? user.userId : "",
        name: editProfileValues.nickname,
        imageUrl: editProfileValues.imageUrl,
        email: user.userEmail ? user.userEmail : "",
      };
      const response = await updateUser(payload, userKey);
      dispatch(
        setUserName({
          name: editProfileValues.nickname,
        })
      );
      setOpenModal(false);
      return response;
    } else {
      const payload = {
        id: user.userId ? user.userId : "",
        name: editProfileValues.nickname,
        imageUrl: editProfileValues.imageUrl,
        email: user.userEmail ? user.userEmail : "",
      };
      const response = await createUser(payload);
      dispatch(
        setUserName({
          name: editProfileValues.nickname,
        })
      );
      setOpenModal(false);
      return response;
    }
  }

  function getUs() {
    const usr = fetchUser(user.userName ? user.userName : "");
  }
  return (
    <LinearGradient
      colors={colors.primaryGradient}
      style={styles.userCard}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <View style={styles.userImg}></View>
      <Text style={styles.userNameTitle}>Nickname:</Text>
      <Text style={styles.userName}>
        {user.userName ? user.userName : "No Name"}
      </Text>
      <Pressable style={styles.editBtn} onPress={editProfile}>
        <Text style={styles.editText}>Edit profile</Text>
        <FontAwesome name="edit" size={20} color={colors.white} />
      </Pressable>
      <Modal visible={openModal}>
        <View style={styles.modalView}>
          <View style={styles.label}>
            <Text style={styles.labelTitle}>Your Nickname:</Text>
            <TextInput
              style={styles.labelInput}
              value={editProfileValues.nickname}
              onChangeText={(value: string) =>
                setEditProfileValues({ ...editProfileValues, nickname: value })
              }
            />
          </View>
          <View style={styles.modalButtons}>
            <Pressable style={styles.updateBtn} onPress={updateUserData}>
              <Text style={styles.btnText}>UPDATE</Text>
            </Pressable>
            <Pressable style={styles.updateBtn} onPress={getUs}>
              <Text style={styles.btnText}>getUser</Text>
            </Pressable>
            <Pressable
              style={styles.cancelBtn}
              onPress={() => setOpenModal(false)}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

export default UserCard;

const styles = StyleSheet.create({
  userCard: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  userImg: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: colors.blue,
  },
  userNameTitle: {
    fontFamily: "baloo",
    fontSize: 12,
    color: colors.gray,
    marginTop: 16,
  },
  userName: {
    fontFamily: "baloo-bold",
    fontSize: 24,
    color: colors.white,
    marginBottom: 8,
  },
  editBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.blue,
    borderRadius: 4,
  },
  editText: {
    fontFamily: "baloo-bold",
    fontSize: 16,
    color: colors.white,
    marginRight: 8,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    color: colors.white,
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
  btnText: {
    fontSize: 16,
    fontFamily: "baloo-bold",
    color: colors.black,
  },
});
