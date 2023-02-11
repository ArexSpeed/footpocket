import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/Colors";

interface Props {
  name: string;
  onPress: () => void;
}

function LeagueCard({ name, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
      android_ripple={{ color: "#ccc" }}
    >
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.leagueCard}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View></View>
        <Text style={styles.leagueText}>{name}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export default LeagueCard;

const styles = StyleSheet.create({
  leagueCard: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    height: 150,
    width: 150,
    borderRadius: 8,
    elevation: 4,
  },
  leagueText: {
    fontSize: 16,
    fontFamily: "baloo",
    color: colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
});
