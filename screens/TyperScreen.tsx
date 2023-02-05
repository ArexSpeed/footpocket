import {
  StyleSheet,
  Button,
  Text,
  Pressable,
  View,
  ScrollView,
} from "react-native";

import { RootTabScreenProps } from "../types";
import Container from "../components/Container";
import Title from "../components/Title";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/Colors";
import typerData from "../data/typer.json";

export default function TyperScreen({
  navigation,
}: RootTabScreenProps<"TyperMain">) {
  function navigateHandler(league: string) {
    navigation.navigate("TyperLeague", {
      league: league,
    });
  }

  return (
    <Container>
      <Title>Choose your typer league</Title>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.text}>My Leagues</Text>
          <Pressable style={styles.playBtn}>
            <Text style={styles.text}>Create New</Text>
          </Pressable>
        </View>
        {typerData.map((item) => (
          <Pressable
            key={item.leagueId}
            onPress={() => navigateHandler(item.leagueName)}
          >
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.titleRow}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.text}>{item.leagueName}</Text>
              <Text style={styles.textGray}>{item.table.length} members</Text>
            </LinearGradient>
          </Pressable>
        ))}

        <View style={{ marginTop: 16 }}></View>
        <View style={styles.titleRow}>
          <Text style={styles.text}>Open Leagues</Text>
        </View>
        <Pressable>
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.titleRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.text}>Premier League</Text>
            <View style={styles.gameRow}>
              <Pressable style={styles.joinBtn}>
                <Text style={styles.text}>Join</Text>
              </Pressable>
              <Text style={styles.textGray}>18 members</Text>
            </View>
          </LinearGradient>
        </Pressable>
        <Pressable>
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.titleRow}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.text}>Bundesliga</Text>
            <Text style={styles.textGray}>8 members</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
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
});
