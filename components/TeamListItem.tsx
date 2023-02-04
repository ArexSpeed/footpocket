import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";

interface Props {
  team: Team;
}

interface Team {
  name: string;
  att: number;
  mid: number;
  def: number;
}

function TeamListItem({ team }: Props) {
  function skillColor(skill: number) {
    if (skill > 80) {
      return styles.skillLightGreen;
    }
    if (skill > 70) {
      return styles.skillGreen;
    }
    if (skill > 60) {
      return styles.skillLightBlue;
    }
    if (skill > 50) {
      return styles.skillBlue;
    }
    if (skill > 40) {
      return styles.skillLightRed;
    }
    if (skill <= 40) {
      return styles.skillRed;
    }
  }
  return (
    <View style={styles.teamBox} key={team.name}>
      <View>
        <Text style={styles.textInputItem}> {team.name}</Text>
      </View>
      <View style={styles.skillsBox}>
        <View style={styles.skillBox}>
          <Text style={[styles.skill, skillColor(team.att)]}>{team.att}</Text>
        </View>
        <View style={styles.skillBox}>
          <Text style={[styles.skill, skillColor(team.mid)]}>{team.mid}</Text>
        </View>
        <View style={styles.skillBox}>
          <Text style={[styles.skill, skillColor(team.def)]}>{team.def}</Text>
        </View>
      </View>
    </View>
  );
}

export default TeamListItem;

const styles = StyleSheet.create({
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
  skillGreen: {
    color: colors.green,
  },
  skillLightGreen: {
    color: colors.lightgreen,
  },
  skillBlue: {
    color: colors.blue,
  },
  skillLightBlue: {
    color: colors.lightblue,
  },
  skillLightRed: {
    color: colors.lightred,
  },
  skillRed: {
    color: colors.red,
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
});
