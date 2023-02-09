import {
  StyleSheet,
  Button,
  Text,
  Pressable,
  View,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { RootTabScreenProps } from "../types";
import Container from "../components/Container";
import Title from "../components/Title";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/Colors";
import typerData from "../data/typer.json";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import {
  createTyperLeague,
  fetchAllTypers,
  fetchUserTypersLeague,
} from "../services/typer";

interface Typer {
  id: string;
  league: string;
  users: [];
}

export default function TyperScreen({
  navigation,
}: RootTabScreenProps<"TyperMain">) {
  const user = useSelector((state: RootState) => state.user);
  const [modalCreate, setModalCreate] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState("");
  const [typersLeagues, setTypersLeagues] = useState<Typer[]>([]);
  const [userLeagues, setUserLeagues] = useState<Typer[]>([]);
  function navigateHandler(league: string) {
    navigation.navigate("TyperLeague", {
      league: league,
    });
  }

  useEffect(() => {
    setTypersLeagues([]);
    async function getTypersLeague() {
      const response = await fetchAllTypers();
      setTypersLeagues(response);
    }
    async function getUserTypersLeague() {
      const response = await fetchUserTypersLeague(user.userId);
      setUserLeagues(response);
    }

    getTypersLeague();
    getUserTypersLeague();
  }, []);

  async function createLeague() {
    const payload = {
      leagueName: newLeagueName,
      user: user,
    };
    const response = await createTyperLeague(payload);
    setModalCreate(false);
    return response;
  }

  return (
    <Container>
      <Title>Choose your typer league</Title>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.text}>User Leagues</Text>
          {user.userId && (
            <Pressable
              style={styles.playBtn}
              onPress={() => setModalCreate(true)}
            >
              <Text style={styles.text}>Create New</Text>
            </Pressable>
          )}
        </View>
        {userLeagues.length <= 0 && (
          <Text style={styles.text}>
            You are not involved in any typer league
          </Text>
        )}
        {userLeagues?.map((item, i) => (
          <Pressable key={item.id} onPress={() => navigateHandler(item.league)}>
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.titleRow}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.text}>{item.league}</Text>
              <Text style={styles.textGray}>{item.users.length} members</Text>
            </LinearGradient>
          </Pressable>
        ))}
        <View style={styles.titleRow}>
          <Text style={styles.text}>All Leagues</Text>
        </View>
        {typersLeagues?.map((item, i) => {
          return (
            <Pressable
              key={item.id}
              onPress={() => navigateHandler(item.league)}
            >
              <LinearGradient
                colors={colors.primaryGradient}
                style={styles.titleRow}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.text}>{item.league}</Text>
                <Text style={styles.textGray}>{item.users.length} members</Text>
              </LinearGradient>
            </Pressable>
          );
        })}
      </ScrollView>
      <Modal visible={modalCreate}>
        <View style={styles.modalView}>
          <View style={styles.label}>
            <Text style={styles.labelTitle}>League name:</Text>
            <TextInput
              style={styles.labelInput}
              value={newLeagueName}
              onChangeText={(value) => setNewLeagueName(value)}
            />
          </View>
          <View style={styles.modalButtons}>
            <Pressable style={styles.updateBtn} onPress={createLeague}>
              <Text style={styles.btnText}>CREATE</Text>
            </Pressable>
            <Pressable
              style={styles.cancelBtn}
              onPress={() => setModalCreate(false)}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 4,
    width: "100%",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 4,
    backgroundColor: "transparent",
    borderRadius: 4,
    marginBottom: 4,
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
  textGray: {
    color: colors.gray,
    fontSize: 12,
    fontFamily: "baloo-bold",
  },
  joinBtn: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    backgroundColor: colors.blue,
    marginRight: 8,
  },
  // Modal
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
    fontSize: 24,
    fontFamily: "baloo-bold",
    color: colors.black,
  },
});
