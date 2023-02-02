import {
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";

import { colors } from "../constants/Colors";
import { RootTabScreenProps } from "../types";

const TEAMS = [
  {
    name: "Liverpool",
    att: 87,
    mid: 83,
    def: 85,
  },
  {
    name: "ManCity",
    att: 87,
    mid: 87,
    def: 83,
  },
  {
    name: "Borussia Moechengladbach",
    att: 79,
    mid: 79,
    def: 80,
  },
  {
    name: "Chelsea",
    att: 80,
    mid: 83,
    def: 81,
  },
  {
    name: "Manchester United",
    att: 83,
    mid: 80,
    def: 80,
  },
  {
    name: "Wolves",
    att: 79,
    mid: 79,
    def: 77,
  },
  {
    name: "Spurs",
    att: 86,
    mid: 82,
    def: 82,
  },
  {
    name: "Arsenal",
    att: 84,
    mid: 82,
    def: 78,
  },
  {
    name: "Everton",
    att: 80,
    mid: 78,
    def: 79,
  },
  {
    name: "WestHam",
    att: 82,
    mid: 78,
    def: 72,
  },
  {
    name: "Watford",
    att: 76,
    mid: 78,
    def: 75,
  },
  {
    name: "Newcastle",
    att: 76,
    mid: 77,
    def: 77,
  },
  {
    name: "Crystal",
    att: 73,
    mid: 77,
    def: 76,
  },
  {
    name: "Bournemouth",
    att: 78,
    mid: 76,
    def: 76,
  },
  {
    name: "Burnley",
    att: 77,
    mid: 76,
    def: 76,
  },
  {
    name: "AstonVilla",
    att: 77,
    mid: 75,
    def: 75,
  },
  {
    name: "Brighton",
    att: 76,
    mid: 77,
    def: 76,
  },
  {
    name: "Southampton",
    att: 75,
    mid: 76,
    def: 76,
  },
  {
    name: "SheffieldUtd",
    att: 73,
    mid: 76,
    def: 75,
  },
  {
    name: "Norwich",
    att: 76,
    mid: 74,
    def: 72,
  },
];

export default function SimulatorListScreen({
  navigation,
}: RootTabScreenProps<"SimulatorList">) {
  function pressHandler() {
    navigation.navigate("SimulatorGame");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premier League</Text>
      <ScrollView style={styles.scrollView}>
        {TEAMS.map((team) => (
          <View style={styles.teamBox} key={team.name}>
            <View>
              <TextInput style={styles.textInputItem} value={team.name} />
            </View>
            <View style={styles.skillsBox}>
              <View style={styles.skillBox}>
                <Pressable style={styles.minus}>
                  <Text style={styles.btnText}>-</Text>
                </Pressable>
                <Text style={styles.skill}>{team.att}</Text>
                <Pressable style={styles.plus}>
                  <Text style={styles.btnText}>+</Text>
                </Pressable>
              </View>
              <View style={styles.skillBox}>
                <Pressable style={styles.minus}>
                  <Text style={styles.btnText}>-</Text>
                </Pressable>
                <Text style={styles.skill}>{team.mid}</Text>
                <Pressable style={styles.plus}>
                  <Text style={styles.btnText}>+</Text>
                </Pressable>
              </View>
              <View style={styles.skillBox}>
                <Pressable style={styles.minus}>
                  <Text style={styles.btnText}>-</Text>
                </Pressable>
                <Text style={styles.skill}>{team.def}</Text>
                <Pressable style={styles.plus}>
                  <Text style={styles.btnText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable style={styles.startBtn} onPress={pressHandler}>
        <Text style={styles.startText}>START</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.background,
    color: colors.white,
  },
  title: {
    fontFamily: "baloo",
    fontSize: 24,
    color: colors.white,
  },
  scrollView: {
    width: "100%",
    marginHorizontal: 20,
    padding: 8,
  },
  teamBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 4,
    backgroundColor: colors.primary,
    borderRadius: 4,
    marginBottom: 8,
  },
  textInputItem: {
    fontFamily: "baloo-bold",
    fontSize: 20,
    width: 200,
    //maxWidth: "50%",
    color: colors.white,
  },
  skillsBox: {
    flexDirection: "row",
  },
  skillBox: {
    flexDirection: "row",
    paddingHorizontal: 4,
    alignItems: "center",
  },
  skill: {
    fontFamily: "baloo-bold",
    fontSize: 20,
    color: colors.white,
  },
  plus: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    color: colors.white,
    width: 12,
    height: 12,
    margin: 2,
    border: 0,
  },
  minus: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
    color: colors.white,
    width: 12,
    height: 12,
    margin: 2,
    border: 0,
  },
  btnText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: "baloo-bold",
  },
  startBtn: {
    backgroundColor: colors.green,
    padding: 8,
    borderRadius: 50,
    margin: 4,
  },
  startText: {
    fontSize: 24,
    fontFamily: "baloo-bold",
    color: colors.black,
  },
});
