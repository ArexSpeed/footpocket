import { StyleSheet, Button } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TyperScreen({
  navigation,
}: RootTabScreenProps<"TyperMain">) {
  function pressHandler() {
    navigation.navigate("TyperLeague");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Typer</Text>
      <Button title="League" onPress={pressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
