import { LinearGradient } from "expo-linear-gradient";
import { useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text, Pressable } from "react-native";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Title from "../components/Title";
import { RootTabScreenProps } from "../types";
import { colors } from "../constants/Colors";
import { fetchOneTypers, joinToLeague } from "../services/typer";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import TyperScores from "../components/TyperScores";

interface Table {
  userId: string;
  name: string;
  score: number;
}

export default function TyperLeagueScreen({
  navigation,
  route,
}: RootTabScreenProps<"TyperLeague">) {
  const user = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState("Tables");
  const [tableData, setTableData] = useState<Table[] | undefined>([]);
  const [leagueData, setLeagueData] = useState({
    id: "",
    name: "",
  });

  useLayoutEffect(() => {
    async function getTyperLeague(name: string) {
      const response = await fetchOneTypers(name);
      console.log("response 2", response);
      if (response) {
        setTableData(response.users);
        setLeagueData({
          id: response.id,
          name: name,
        });
      }
      return response;
    }
    if (route.params?.league) {
      getTyperLeague(route.params.league);
    }
  }, [route]);

  function activeTabHandler(tab: string) {
    setActiveTab(tab);
  }

  const isUserInLeague = useCallback(() => {
    const findUser = tableData?.find((usr) => usr.name === user.userName);
    if (findUser) {
      return true;
    } else {
      return false;
    }
  }, [tableData]);

  async function joinHandler() {
    if (user && leagueData) {
      const response = await joinToLeague(user, leagueData.id, leagueData.name);
    }
  }
  return (
    <Container>
      <Title>{route.params ? route.params.league : "Typer League"}</Title>
      {user.userName && !isUserInLeague() && (
        <Pressable style={styles.playBtn} onPress={joinHandler}>
          <Text style={styles.text}>Join</Text>
        </Pressable>
      )}

      <Tabs
        tab1="Scores"
        tab2="Tables"
        activeTab={activeTab}
        onPress={activeTabHandler}
      />
      {activeTab === "Scores" ? (
        <TyperScores />
      ) : (
        <ScrollView style={styles.tableContainer}>
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.tableRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.th}>#</Text>
              <Text style={styles.th}>Name</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.thsmall}>Last</Text>
              <Text style={styles.th}>PT</Text>
            </View>
          </LinearGradient>
          {tableData?.map((item, i) => (
            <View
              key={item.userId}
              style={[
                styles.tableRow,
                i % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven,
              ]}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.tr}>{i + 1}</Text>
                <Text style={styles.tr}>{item.name}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.trSmall}>{item.score}</Text>
                <Text style={styles.tr}>{item.score}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    width: "100%",
  },
  // Scores
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

  // Table
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
  tableRowOdd: {
    backgroundColor: colors.black,
  },
  tableRowEven: {
    backgroundColor: colors.darkgray,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  th: {
    color: colors.gray,
    fontSize: 16,
    fontFamily: "baloo",
    paddingHorizontal: 4,
  },
  thsmall: {
    color: colors.gray,
    fontSize: 12,
    fontFamily: "baloo",
    paddingHorizontal: 4,
  },
  tr: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "baloo-bold",
    paddingHorizontal: 4,
  },
  trSmall: {
    color: colors.white,
    fontSize: 12,
    fontFamily: "baloo-bold",
    paddingHorizontal: 4,
  },
});
