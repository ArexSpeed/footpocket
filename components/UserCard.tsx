import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

function UserCard() {
  return (
    <LinearGradient
      colors={colors.primaryGradient}
      style={styles.userCard}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <View style={styles.userImg}></View>
      <Text style={styles.userName}>User Name</Text>
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
  userName: {
    fontFamily: "baloo-bold",
    fontSize: 24,
    color: colors.white,
    marginTop: 16,
  },
});
