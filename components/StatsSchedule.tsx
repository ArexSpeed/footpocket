import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";

{
  /* This part will be done, currently face problem with subscription on API */
}
function StatsSchedule() {
  return (
    <ScrollView style={styles.scrollContainer}>
      {/* Round1 */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.roundRow}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={styles.text}>Round 1</Text>
      </LinearGradient>
      {/* VS */}
      <LinearGradient
        colors={[colors.blue, colors.black]}
        style={styles.gameRow}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.gameRowText}>
          <Text style={styles.text}>ManchesterUnited</Text>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.text}>2</Text>
          <Text style={styles.text}> : </Text>
          <Text style={styles.text}>0</Text>
        </View>
        <View style={styles.gameRowTextEnd}>
          <Text style={styles.text}>Tottenham</Text>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={[colors.black, colors.blue]}
        style={styles.gameRow}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.gameRowText}>
          <Text style={styles.text}>Liverpool</Text>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.text}>2</Text>
          <Text style={styles.text}> : </Text>
          <Text style={styles.text}>0</Text>
        </View>
        <View style={styles.gameRowTextEnd}>
          <Text style={styles.text}>Everton</Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

export default StatsSchedule;

const styles = StyleSheet.create({
  scrollContainer: {
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
});
