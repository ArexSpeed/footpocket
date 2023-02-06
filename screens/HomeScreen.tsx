import { useState } from "react";
import { StyleSheet } from "react-native";
import AuthContent from "../components/auth/AuthContent";
import Container from "../components/Container";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import UserCard from "../components/UserCard";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <Container>
      {isLogged ? (
        <UserCard />
      ) : (
        <AuthContent isLogin={true} onAuthenticate="" />
      )}
    </Container>
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
