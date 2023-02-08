import {
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Text,
  View,
  Pressable,
  Modal,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import Container from "../components/Container";
import Title from "../components/Title";
import TeamListItem from "../components/TeamListItem";

import { colors } from "../constants/Colors";
import { RootTabScreenProps } from "../types";
import Slider from "@react-native-community/slider";
import teamsData from "../data/teams.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { createTable, updateTeam } from "../context/slices/simulatorSlice";

interface Team {
  id: string;
  name: string;
  att: number;
  mid: number;
  def: number;
}

export default function SimulatorListScreen({
  navigation,
  route,
}: RootTabScreenProps<"SimulatorList">) {
  //const [teams, setTeams] = useState<Team[] | undefined>([]);
  const dispatch = useDispatch();
  const { teams } = useSelector((state: RootState) => state.simulator);
  const [editTeamValue, setEditTeamValue] = useState<Team>({
    id: "",
    name: "",
    att: 0,
    mid: 0,
    def: 0,
  });
  const [editModal, setEditModal] = useState(false);

  // useLayoutEffect(() => {
  //   if (route.params?.league) {
  //     const selectedTeams = teamsData.find(
  //       (item) => item.leagueName === route.params?.league
  //     );
  //     setTeams(selectedTeams?.teams);
  //   }
  // }, [route]);
  function pressHandler() {
    dispatch(createTable(teams));
    navigation.navigate("SimulatorGame");
  }

  function editHandler(team: Team) {
    setEditModal(true);
    setEditTeamValue(team);
  }

  function updateTeamHandler() {
    dispatch(updateTeam(editTeamValue));
    setEditModal(false);
  }
  return (
    <Container>
      <Title>{route.params ? route.params.league : ""}</Title>
      <ScrollView style={styles.scrollView}>
        <View style={styles.teamTitle}>
          <View>
            <Text style={styles.teamTitleText}>Name</Text>
          </View>
          <View style={styles.teamTitleSkills}>
            <Text style={styles.teamTitleText}>F</Text>
            <Text style={styles.teamTitleText}>M</Text>
            <Text style={styles.teamTitleText}>D</Text>
          </View>
        </View>
        {teams?.map((team) => (
          <Pressable key={team.name} onPress={() => editHandler(team)}>
            <TeamListItem key={team.name} team={team} />
          </Pressable>
        ))}
      </ScrollView>
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
              //onSlidingComplete={(value) => console.log(value)}
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
      <Pressable style={styles.startBtn} onPress={pressHandler}>
        <Text style={styles.startText}>START</Text>
      </Pressable>
    </Container>
  );
}

const styles = StyleSheet.create({
  slider: {
    width: 200,
    height: 48,
  },
  scrollView: {
    width: "100%",
    marginHorizontal: 20,
    padding: 8,
  },
  teamTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 4,
    backgroundColor: "transparent",
    marginBottom: 4,
  },
  teamTitleSkills: {
    flexDirection: "row",
  },
  teamTitleText: {
    fontSize: 16,
    fontFamily: "baloo",
    color: colors.gray,
    paddingHorizontal: 8,
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
  startBtn: {
    backgroundColor: colors.green,
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
