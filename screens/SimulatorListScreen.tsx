import { StyleSheet, ScrollView, Text, View, Pressable } from "react-native";
import { useState } from "react";
import Container from "../components/Container";
import Title from "../components/Title";
import TeamListItem from "../components/TeamListItem";

import { colors } from "../constants/Colors";
import { RootTabScreenProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import {
  createSchedule,
  createTable,
  updateTeam,
} from "../context/slices/simulatorSlice";
import { fixtures } from "../util/fixtures";
import EditTeamValueModal from "../components/modals/EditTeamValueModal";

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

  function pressHandler() {
    dispatch(createTable(teams));
    const schedule = fixtures(teams);
    dispatch(createSchedule(schedule));
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
      <EditTeamValueModal
        editModal={editModal}
        setEditModal={setEditModal}
        editTeamValue={editTeamValue}
        setEditTeamValue={setEditTeamValue}
        updateTeamHandler={updateTeamHandler}
      />

      <Pressable style={styles.startBtn} onPress={pressHandler}>
        <Text style={styles.startText}>START</Text>
      </Pressable>
    </Container>
  );
}

const styles = StyleSheet.create({
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
